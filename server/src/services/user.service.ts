import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/apiError';
import { prisma } from '../config/db.config';
import { env } from '../config/env.config';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return this.userRepository.findById(userId);
  }

  public async updateProfile(userId: string, data: any) {
    return this.userRepository.update(userId, data);
  }

  public async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      throw ApiError.badRequest('Current password is incorrect');
    }

    const passwordHash = await bcrypt.hash(newPassword, env.BCRYPT_SALT_ROUNDS);
    await this.userRepository.update(userId, { passwordHash });

    return { message: 'Password updated successfully' };
  }

  public async getDashboardStats(userId: string) {
    const [registrations, submissions, certificates, notifications, user] = await Promise.all([
      prisma.registration.findMany({
        where: { userId },
        include: { event: true, team: true },
      }),
      prisma.submission.findMany({
        where: { userId },
        include: { event: true },
      }),
      prisma.certificate.findMany({
        where: { userId },
        include: { event: true },
      }),
      prisma.notification.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      this.userRepository.findById(userId),
    ]);

    return {
      user,
      stats: {
        registeredEventsCount: registrations.length,
        submissionsCount: submissions.length,
        certificatesCount: certificates.length,
        unreadNotificationsCount: notifications.filter((n) => !n.read).length,
      },
      registrations,
      submissions,
      certificates,
      notifications,
    };
  }
}
