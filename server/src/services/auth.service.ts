import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { env } from '../config/env.config';
import { ApiError } from '../utils/apiError';
import { prisma } from '../config/db.config';
import { UserRole } from '@prisma/client';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async register(payload: {
    fullName: string;
    email: string;
    phone?: string;
    college?: string;
    department?: string;
    year?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    password: string;
    role?: UserRole;
  }) {
    const existingUser = await this.userRepository.findByEmail(payload.email);
    if (existingUser) {
      throw ApiError.conflict('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(payload.password, env.BCRYPT_SALT_ROUNDS);

    const user = await this.userRepository.create({
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone || null,
      college: payload.college || null,
      department: payload.department || null,
      year: payload.year || null,
      githubUrl: payload.githubUrl || null,
      linkedinUrl: payload.linkedinUrl || null,
      passwordHash,
      role: payload.role || UserRole.STUDENT,
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  public async login(payload: { email: string; password: string; rememberMe?: boolean }) {
    const user = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(payload.password, user.passwordHash);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role, payload.rememberMe);

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  public async forgotPassword(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // Return success to avoid email enumeration
      return { message: 'Password reset link sent to email if account exists' };
    }

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    return {
      message: 'Password reset token generated successfully',
      resetToken: token, // Returned for dev testing/verification
    };
  }

  public async resetPassword(token: string, newPassword: string) {
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetRecord || resetRecord.expiresAt < new Date()) {
      throw ApiError.badRequest('Invalid or expired password reset token');
    }

    const passwordHash = await bcrypt.hash(newPassword, env.BCRYPT_SALT_ROUNDS);

    await prisma.user.update({
      where: { id: resetRecord.userId },
      data: { passwordHash },
    });

    await prisma.passwordResetToken.delete({
      where: { id: resetRecord.id },
    });

    return { message: 'Password has been reset successfully' };
  }

  public async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as any;

      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!storedToken || storedToken.isRevoked) {
        throw ApiError.unauthorized('Refresh token is invalid or revoked');
      }

      const user = await this.userRepository.findById(decoded.id);
      if (!user) {
        throw ApiError.unauthorized('User not found');
      }

      const newTokens = await this.generateTokens(user.id, user.email, user.role);
      return newTokens;
    } catch {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }
  }

  public async logout(refreshToken: string) {
    if (refreshToken) {
      await prisma.refreshToken.updateMany({
        where: { token: refreshToken },
        data: { isRevoked: true },
      });
    }
    return { message: 'Logged out successfully' };
  }

  private async generateTokens(userId: string, email: string, role: UserRole, rememberMe = false) {
    const accessToken = jwt.sign(
      { id: userId, email, role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );

    const refreshExpiresIn = rememberMe ? '30d' : env.JWT_REFRESH_EXPIRES_IN;

    const refreshToken = jwt.sign(
      { id: userId, email, role },
      env.JWT_REFRESH_SECRET,
      { expiresIn: refreshExpiresIn } as jwt.SignOptions
    );

    const expiresAt = new Date(Date.now() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  public sanitizeUser(user: any) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      college: user.college,
      department: user.department,
      year: user.year,
      role: user.role,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      githubUrl: user.githubUrl,
      linkedinUrl: user.linkedinUrl,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    };
  }
}
