import { EventType, EventStatus, EventMode, RegistrationStatus, TeamMemberRole, SubmissionStatus } from './enums';

export interface IEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  theme?: string | null;
  rules?: string | null;
  judgingCriteria?: string | null;
  bannerUrl?: string | null;
  logoUrl?: string | null;
  eventType: EventType;
  status: EventStatus;
  mode: EventMode;
  venue?: string | null;
  maxTeamSize: number;
  minTeamSize: number;
  prizePool?: string | null;
  startDate: Date | string;
  endDate: Date | string;
  registrationDeadline: Date | string;
  submissionDeadline: Date | string;
  isRegistrationOpen: boolean;
  isSubmissionOpen: boolean;
  organizerId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IRegistration {
  id: string;
  eventId: string;
  userId: string;
  teamId?: string | null;
  status: RegistrationStatus;
  registeredAt: Date | string;
}

export interface IPayment {
  id: string;
  registrationId: string;
  userId: string;
  amount: number;
  registrationFee: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'MANUAL_VERIFICATION';
  paymentMethod: string;
  transactionId: string;
  upiUtr?: string | null;
  invoiceNumber: string;
  invoiceUrl?: string | null;
  createdAt: Date | string;
}

export interface ISubmission {
  id: string;
  eventId: string;
  teamId?: string | null;
  userId: string;
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string | null;
  videoUrl?: string | null;
  presentationPdfUrl?: string | null;
  techStack: string[];
  status: SubmissionStatus;
  submittedAt: Date | string;
}

export interface ICertificate {
  id: string;
  certificateNumber: string;
  templateId?: string | null;
  userId: string;
  eventId: string;
  certificateType: 'Participation' | 'Winner' | 'Runner Up' | 'Second Runner Up' | 'Judge' | 'Organizer';
  communityName: string;
  recipientName: string;
  eventName: string;
  verificationUrl: string;
  issueDate: Date | string;
  certificateUrl: string;
  qrCodeUrl?: string | null;
  pdfUrl?: string | null;
  event?: IEvent;
}

export interface ICertificateTemplate {
  id: string;
  eventId: string;
  name: string;
  templateType: string;
  templateUrl: string;
  fieldsJson: Record<string, any>;
  createdAt: Date | string;
}

export interface ITeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: TeamMemberRole;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  joinedAt: Date | string;
  user?: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string | null;
    college?: string | null;
  };
}

export interface ITeam {
  id: string;
  name: string;
  code: string;
  teamIdCode: string;
  teamPassword: string;
  maxMembers: number;
  isLocked: boolean;
  registrationStatus: 'UNREGISTERED' | 'REGISTERED';
  eventId: string;
  leaderId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  members?: ITeamMember[];
  event?: IEvent;
}
