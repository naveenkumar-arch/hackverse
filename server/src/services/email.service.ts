import { Resend } from 'resend';
import { env } from '../config/env.config';
import { prisma } from '../config/db.config';
import { emailTemplates, EmailTemplateData } from '../templates/emailTemplates';

export type TemplateType = keyof typeof emailTemplates;

export class EmailService {
  private resend: Resend | null = null;

  constructor() {
    if (env.RESEND_API_KEY && env.RESEND_API_KEY !== 're_123456789') {
      this.resend = new Resend(env.RESEND_API_KEY);
    }
  }

  public async sendEmail(
    to: string,
    templateType: TemplateType,
    data: EmailTemplateData,
    attachments?: { filename: string; content: Buffer | string }[]
  ) {
    const subjectMap: Record<TemplateType, string> = {
      REGISTRATION_SUCCESS: `Registration Confirmed - ${data.eventName || 'Kernel Overriders'}`,
      PAYMENT_SUCCESS: `Payment Receipt #${data.invoiceNumber || 'INV-2026'}`,
      TEAM_JOINED: `New Hacker Joined Team ${data.teamName || ''}`,
      SUBMISSION_RECEIVED: `Project Submission Confirmed`,
      WINNER_ANNOUNCEMENT: `Winners Announced for ${data.eventName || ''}`,
      CERTIFICATE_ISSUED: `Your Certificate is Ready!`,
    };

    const subject = subjectMap[templateType] || 'Kernel Overriders Notification';
    const html = emailTemplates[templateType](data);

    // Create database EmailLog record
    const emailLog = await prisma.emailLog.create({
      data: {
        to,
        subject,
        template: templateType,
        status: 'PENDING',
        hasAttachment: Boolean(attachments && attachments.length > 0),
        attempts: 1,
      },
    });

    try {
      if (this.resend) {
        await this.resend.emails.send({
          from: 'Kernel Overriders <notifications@kerneloverriders.io>',
          to: [to],
          subject,
          html,
          attachments,
        });
      } else {
        console.log(`[Resend Simulation Mode] Email sent to ${to} (${templateType})`);
      }

      await prisma.emailLog.update({
        where: { id: emailLog.id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
        },
      });

      return { success: true, emailLogId: emailLog.id };
    } catch (err: any) {
      console.error(`Email dispatch failed to ${to}:`, err.message);

      await prisma.emailLog.update({
        where: { id: emailLog.id },
        data: {
          status: 'FAILED',
          errorMessage: err.message || 'Resend API dispatch failure',
        },
      });

      return { success: false, error: err.message };
    }
  }

  public async getEmailLogs() {
    return prisma.emailLog.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
    });
  }
}
