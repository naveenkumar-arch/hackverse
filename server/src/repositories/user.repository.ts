import { User } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { prisma } from '../config/db.config';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma, 'user');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateVerificationStatus(userId: string, isVerified: boolean): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isEmailVerified: isVerified },
    });
  }
}
