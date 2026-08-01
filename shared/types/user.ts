import { UserRole } from './enums';

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string | null;
  college?: string | null;
  department?: string | null;
  year?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  isEmailVerified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAdminProfile {
  id: string;
  userId: string;
  permissions: string[];
  department?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: IUser;
  tokens: AuthTokens;
}
