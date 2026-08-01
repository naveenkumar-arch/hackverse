import { PrismaClient, UserRole, EventType, EventStatus, EventMode } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Kernel Overriders database...');

  // Hash passwords
  const passwordHash = await bcrypt.hash('Password123!', 10);

  // 1. Seed Users
  const student = await prisma.user.upsert({
    where: { email: 'alex.rivera@stanford.edu' },
    update: {},
    create: {
      email: 'alex.rivera@stanford.edu',
      passwordHash,
      fullName: 'Alex Rivera',
      phone: '+1 (555) 234-5678',
      college: 'Stanford University',
      department: 'Computer Science',
      year: 'Senior (4th Year)',
      role: UserRole.STUDENT,
      isEmailVerified: true,
      bio: 'Full-stack developer passionate about autonomous agentic AI.',
      githubUrl: 'https://github.com/alexrivera',
      linkedinUrl: 'https://linkedin.com/in/alexrivera',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@kerneloverriders.io' },
    update: {},
    create: {
      email: 'admin@kerneloverriders.io',
      passwordHash,
      fullName: 'Admin System',
      role: UserRole.ADMIN,
      isEmailVerified: true,
      adminProfile: {
        create: {
          permissions: ['ALL'],
          department: 'Core Operations',
        },
      },
    },
  });

  // 2. Seed Events
  const event = await prisma.event.upsert({
    where: { slug: 'kernel-overriders-ai-zenith-2026' },
    update: {},
    create: {
      title: 'Kernel Overriders AI Zenith 2026',
      slug: 'kernel-overriders-ai-zenith-2026',
      shortDescription: 'Build autonomous multi-agent systems and competing LLM workflows with $50,000+ in prizes.',
      description: 'Join over 5,000 top student developers worldwide in building state-of-the-art agentic AI systems, fine-tuned transformer pipelines, and developer productivity tooling.',
      theme: 'Agentic AI & Multi-Agent Swarms',
      rules: '1. Code must be written during 48h event.\n2. Max 6 members per team.\n3. Plagiarism strictly prohibited.',
      judgingCriteria: '• Innovation (30%)\n• Technical Architecture (30%)\n• UX & Design (20%)\n• Pitch & Demo (20%)',
      eventType: EventType.HACKATHON,
      status: EventStatus.UPCOMING,
      mode: EventMode.HYBRID,
      prizePool: '$50,000',
      startDate: new Date('2026-09-15T09:00:00Z'),
      endDate: new Date('2026-09-17T18:00:00Z'),
      registrationDeadline: new Date('2026-09-14T23:59:59Z'),
      submissionDeadline: new Date('2026-09-17T16:00:00Z'),
      isRegistrationOpen: true,
      isSubmissionOpen: true,
      organizerId: admin.id,
      bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    },
  });

  // 3. Seed Team
  const team = await prisma.team.upsert({
    where: { code: 'NC-9821' },
    update: {},
    create: {
      name: 'NeuralCrafters',
      code: 'NC-9821',
      teamIdCode: 'TM-94820',
      teamPassword: 'SEC-8391',
      maxMembers: 6,
      isLocked: false,
      registrationStatus: 'REGISTERED',
      eventId: event.id,
      leaderId: student.id,
      members: {
        create: {
          userId: student.id,
          role: 'LEADER',
          status: 'ACCEPTED',
        },
      },
    },
  });

  // 4. Seed Submission
  await prisma.submission.upsert({
    where: { id: `sub-${student.id}-${event.id}` },
    update: {},
    create: {
      id: `sub-${student.id}-${event.id}`,
      eventId: event.id,
      teamId: team.id,
      userId: student.id,
      title: 'NeuroMesh AI Swarm Platform',
      description: 'Autonomous multi-agent swarm platform for automated medical diagnosis synthesis and clinical research summarization.',
      repoUrl: 'https://github.com/neuralcrafters/neuromesh',
      demoUrl: 'https://neuromesh-demo.vercel.app',
      videoUrl: 'https://youtube.com/watch?v=demo',
      presentationPdfUrl: 'https://drive.google.com/presentation',
      techStack: ['React', 'TypeScript', 'Python', 'PyTorch', 'FastAPI'],
    },
  });

  // 5. Seed Certificates
  await prisma.certificate.upsert({
    where: { certificateNumber: 'KO-2026-AI-8921' },
    update: {},
    create: {
      certificateNumber: 'KO-2026-AI-8921',
      userId: student.id,
      eventId: event.id,
      certificateType: 'Winner',
      communityName: 'Kernel Overriders',
      recipientName: 'Alex Rivera',
      eventName: event.title,
      verificationUrl: 'https://kernel-overriders.vercel.app/verify/KO-2026-AI-8921',
      certificateUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fkernel-overriders.vercel.app%2Fverify%2FKO-2026-AI-8921',
    },
  });

  console.log('✅ Kernel Overriders database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
