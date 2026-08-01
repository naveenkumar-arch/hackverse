import { ApiError } from '../utils/apiError';
import { prisma } from '../config/db.config';
import { PaymentStatus } from '@prisma/client';

export class PaymentService {
  public async initiatePayment(userId: string, payload: { registrationId: string; amount?: number; paymentMethod?: string }) {
    const reg = await prisma.registration.findUnique({
      where: { id: payload.registrationId },
      include: { event: true },
    });

    if (!reg) {
      throw ApiError.notFound('Registration not found');
    }

    const transactionId = `TX-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const invoiceNumber = `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const amount = payload.amount || 499.0;

    return prisma.payment.create({
      data: {
        registrationId: payload.registrationId,
        userId,
        amount,
        registrationFee: amount,
        currency: 'INR',
        status: PaymentStatus.PENDING,
        paymentMethod: payload.paymentMethod || 'UPI',
        transactionId,
        invoiceNumber,
        provider: 'UPI_PAYMENT',
      },
    });
  }

  public async submitUtr(payload: { paymentId: string; upiUtr: string }) {
    const payment = await prisma.payment.findUnique({
      where: { id: payload.paymentId },
    });

    if (!payment) {
      throw ApiError.notFound('Payment record not found');
    }

    return prisma.payment.update({
      where: { id: payload.paymentId },
      data: {
        upiUtr: payload.upiUtr,
        status: PaymentStatus.MANUAL_VERIFICATION,
      },
    });
  }

  public async verifyPaymentAdmin(paymentId: string, action: 'APPROVE' | 'REJECT') {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw ApiError.notFound('Payment record not found');
    }

    const newStatus = action === 'APPROVE' ? PaymentStatus.PAID : PaymentStatus.FAILED;

    return prisma.payment.update({
      where: { id: paymentId },
      data: { status: newStatus },
    });
  }

  public async getUserPayments(userId: string) {
    return prisma.payment.findMany({
      where: { userId },
      include: { registration: { include: { event: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async getAllPaymentsAdmin() {
    return prisma.payment.findMany({
      include: {
        user: { select: { fullName: true, email: true, college: true } },
        registration: { include: { event: true, team: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
