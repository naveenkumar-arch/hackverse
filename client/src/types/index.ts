export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  type: string;
  mode: string;
  location: string;
  prizePool: string;
  participantsCount: number;
  maxTeamSize: number;
  tags: string[];
  schedule: { time: string; title: string; desc: string }[];
  judges: { name: string; role: string; company: string; avatar: string }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  college: string;
  avatar: string;
  content: string;
  hackathonWon: string;
}

export interface WinnerItem {
  id: string;
  eventName: string;
  teamName: string;
  projectTitle: string;
  rank: string;
  prizeAmount: string;
  score: number;
  avatar: string;
  githubUrl: string;
}

export interface CertificateItem {
  id: string;
  certificateNumber: string;
  recipientName: string;
  eventName: string;
  type: string;
  issuedDate: string;
  qrCodeUrl: string;
  verificationStatus: string;
}
