import { Router } from 'express';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { ApiResponse } from '../utils/apiResponse';
import { prisma } from '../config/db.config';
import { UserRole, ApprovalStatus } from '@prisma/client';
import { retryFailedEmails } from '../jobs/emailQueue.job';

const router = Router();

// Protect all admin routes with JWT and ADMIN role guard
router.use(authenticateJwt, authorizeRoles(UserRole.ADMIN));

// 1. Analytics
router.get('/analytics', async (_req, res) => {
  const [totalUsers, totalEvents, totalTeams, totalSubmissions, pendingStudents, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.event.count(),
    prisma.team.count(),
    prisma.submission.count(),
    prisma.user.count({ where: { approvalStatus: ApprovalStatus.PENDING } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'PAID' },
    }),
  ]);

  return ApiResponse.success(res, 'Analytics overview retrieved', {
    totalUsers,
    totalEvents,
    totalTeams,
    totalSubmissions,
    pendingStudents,
    totalRevenue: totalRevenue._sum.amount || 0,
  });
});

// 2. Student Approval Management Endpoints
router.get('/students', async (req, res) => {
  const { status, college, search } = req.query;

  const where: any = { role: UserRole.STUDENT };
  if (status) where.approvalStatus = status as ApprovalStatus;
  if (college) where.college = { contains: String(college), mode: 'insensitive' };
  if (search) {
    where.OR = [
      { fullName: { contains: String(search), mode: 'insensitive' } },
      { email: { contains: String(search), mode: 'insensitive' } },
      { college: { contains: String(search), mode: 'insensitive' } },
    ];
  }

  const students = await prisma.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      fullName: true,
      phone: true,
      college: true,
      department: true,
      year: true,
      githubUrl: true,
      linkedinUrl: true,
      approvalStatus: true,
      approvedAt: true,
      approvedBy: true,
      createdAt: true,
      registrations: { include: { event: true } },
      ledTeams: true,
      payments: true,
      submissions: true,
    },
  });

  return ApiResponse.success(res, 'Student registration list fetched for Admin', students);
});

router.patch('/students/:id/approve', async (req: any, res) => {
  const student = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      approvalStatus: ApprovalStatus.APPROVED,
      approvedAt: new Date(),
      approvedBy: req.user?.email || 'ADMIN',
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user?.id,
      action: 'APPROVE_STUDENT',
      entity: 'USER',
      entityId: student.id,
      details: { email: student.email, approvedBy: req.user?.email },
    },
  });

  return ApiResponse.success(res, 'Student approved successfully', student);
});

router.patch('/students/:id/reject', async (req: any, res) => {
  const student = await prisma.user.update({
    where: { id: req.params.id },
    data: { approvalStatus: ApprovalStatus.REJECTED },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user?.id,
      action: 'REJECT_STUDENT',
      entity: 'USER',
      entityId: student.id,
      details: { email: student.email },
    },
  });

  return ApiResponse.success(res, 'Student rejected', student);
});

router.patch('/students/:id/suspend', async (req: any, res) => {
  const student = await prisma.user.update({
    where: { id: req.params.id },
    data: { approvalStatus: ApprovalStatus.SUSPENDED },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user?.id,
      action: 'SUSPEND_STUDENT',
      entity: 'USER',
      entityId: student.id,
    },
  });

  return ApiResponse.success(res, 'Student account suspended', student);
});

router.patch('/students/:id/reactivate', async (req: any, res) => {
  const student = await prisma.user.update({
    where: { id: req.params.id },
    data: { approvalStatus: ApprovalStatus.APPROVED },
  });

  return ApiResponse.success(res, 'Student account reactivated', student);
});

// 3. Certificate Revocation & Lifecycle
router.patch('/certificates/:id/revoke', async (req: any, res) => {
  const { reason } = req.body;
  const cert = await prisma.certificate.update({
    where: { id: req.params.id },
    data: {
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: reason || 'Revoked by Administrator',
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user?.id,
      action: 'REVOKE_CERTIFICATE',
      entity: 'CERTIFICATE',
      entityId: cert.id,
      details: { certificateNumber: cert.certificateNumber, reason },
    },
  });

  return ApiResponse.success(res, 'Certificate revoked successfully', cert);
});

// 4. System & Email Logs
router.get('/email-logs', async (_req, res) => {
  const emailLogs = await prisma.emailLog.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' },
  });
  return ApiResponse.success(res, 'Email dispatch logs retrieved', emailLogs);
});

router.post('/emails/retry-failed', async (_req, res) => {
  const result = await retryFailedEmails();
  return ApiResponse.success(res, `Retried ${result.totalAttempted} failed emails (${result.retriedCount} succeeded)`, result);
});

router.delete('/registrations/:id', async (req: any, res) => {
  try {
    await prisma.registration.delete({ where: { id: req.params.id } });
    await prisma.auditLog.create({
      data: {
        userId: req.user?.id,
        action: 'DELETE_REGISTRATION',
        entity: 'REGISTRATION',
        entityId: req.params.id,
      },
    });
    return ApiResponse.success(res, 'Registration deleted permanently');
  } catch {
    return ApiResponse.error(res, 'Registration record not found', 404);
  }
});

router.delete('/teams/:id', async (req: any, res) => {
  try {
    await prisma.team.delete({ where: { id: req.params.id } });
    await prisma.auditLog.create({
      data: {
        userId: req.user?.id,
        action: 'DELETE_TEAM',
        entity: 'TEAM',
        entityId: req.params.id,
      },
    });
    return ApiResponse.success(res, 'Team deleted permanently');
  } catch {
    return ApiResponse.error(res, 'Team record not found', 404);
  }
});

router.delete('/events/:id', async (req: any, res) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    await prisma.auditLog.create({
      data: {
        userId: req.user?.id,
        action: 'DELETE_EVENT',
        entity: 'EVENT',
        entityId: req.params.id,
      },
    });
    return ApiResponse.success(res, 'Event deleted permanently');
  } catch {
    return ApiResponse.error(res, 'Event record not found', 404);
  }
});

export default router;
