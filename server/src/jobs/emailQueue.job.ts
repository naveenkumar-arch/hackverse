import { EmailService, TemplateType } from '../services/email.service';
import { prisma } from '../config/db.config';

const emailService = new EmailService();

export async function queueEmail(
  to: string,
  templateType: TemplateType,
  data: any,
  attachments?: any[]
) {
  // Non-blocking background execution
  setImmediate(async () => {
    try {
      await emailService.sendEmail(to, templateType, data, attachments);
    } catch (err) {
      console.error(`Background job email failure for ${to}:`, err);
    }
  });
}

export async function retryFailedEmails() {
  const failedLogs = await prisma.emailLog.findMany({
    where: {
      status: 'FAILED',
      attempts: { lt: 3 },
    },
    take: 20,
  });

  let retriedCount = 0;

  for (const log of failedLogs) {
    try {
      await prisma.emailLog.update({
        where: { id: log.id },
        data: { attempts: log.attempts + 1 },
      });

      const res = await emailService.sendEmail(
        log.to,
        log.template as TemplateType,
        { recipientName: 'Kernel Overriders Member', eventName: 'Kernel Overriders Event' }
      );

      if (res.success) {
        retriedCount++;
      }
    } catch (err) {
      console.error(`Retry attempt failed for log ${log.id}`);
    }
  }

  return { retriedCount, totalAttempted: failedLogs.length };
}
