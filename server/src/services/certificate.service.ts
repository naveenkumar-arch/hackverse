import { ApiError } from '../utils/apiError';
import { prisma } from '../config/db.config';
import { env } from '../config/env.config';

export class CertificateService {
  public async uploadTemplate(payload: {
    eventId: string;
    name: string;
    templateType: string;
    templateUrl: string;
  }) {
    return prisma.certificateTemplate.upsert({
      where: { eventId: payload.eventId },
      update: {
        name: payload.name,
        templateType: payload.templateType,
        templateUrl: payload.templateUrl,
      },
      create: {
        eventId: payload.eventId,
        name: payload.name,
        templateType: payload.templateType,
        templateUrl: payload.templateUrl,
      },
    });
  }

  public async getTemplates() {
    return prisma.certificateTemplate.findMany({
      include: { event: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async generateCertificate(payload: {
    userId: string;
    eventId: string;
    certificateType: 'Participation' | 'Winner' | 'Runner Up' | 'Second Runner Up' | 'Judge' | 'Organizer';
    recipientName: string;
    eventName: string;
  }) {
    const shortRandom = Math.floor(1000 + Math.random() * 9000);
    const typeCode = payload.certificateType.toUpperCase().replace(/\s+/g, '-').slice(0, 4);
    const certificateNumber = `HV-2026-${typeCode}-${shortRandom}`;
    const verificationUrl = `${env.CLIENT_URL}/verify/${certificateNumber}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(verificationUrl)}`;

    return prisma.certificate.create({
      data: {
        certificateNumber,
        userId: payload.userId,
        eventId: payload.eventId,
        certificateType: payload.certificateType,
        communityName: 'Kernel Overriders',
        recipientName: payload.recipientName,
        eventName: payload.eventName,
        verificationUrl,
        certificateUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop',
        qrCodeUrl,
        pdfUrl: `${verificationUrl}.pdf`,
      },
    });
  }

  public async verifyCertificate(certificateNumber: string) {
    const cert = await prisma.certificate.findUnique({
      where: { certificateNumber: certificateNumber.trim().toUpperCase() },
      include: { event: true, user: { select: { fullName: true, email: true, college: true } } },
    });

    if (!cert) {
      throw ApiError.notFound('Certificate record not found or invalid Certificate ID');
    }

    return cert;
  }

  public async getUserCertificates(userId: string) {
    return prisma.certificate.findMany({
      where: { userId },
      include: { event: true },
      orderBy: { issueDate: 'desc' },
    });
  }
}
