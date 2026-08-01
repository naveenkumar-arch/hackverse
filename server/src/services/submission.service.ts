import { ApiError } from '../utils/apiError';
import { prisma } from '../config/db.config';
import { SubmissionStatus } from '@prisma/client';

export class SubmissionService {
  public async submitProject(userId: string, payload: {
    eventId: string;
    teamId?: string;
    title: string;
    description: string;
    repoUrl: string;
    demoUrl?: string;
    videoUrl?: string;
    presentationPdfUrl?: string;
    techStack?: string[];
  }) {
    const event = await prisma.event.findUnique({
      where: { id: payload.eventId },
    });

    if (!event) {
      throw ApiError.notFound('Event not found');
    }

    if (!event.isSubmissionOpen) {
      throw ApiError.badRequest('Submissions for this event are currently closed by the Admin');
    }

    if (new Date() > new Date(event.submissionDeadline)) {
      throw ApiError.badRequest(`Submissions closed on ${event.submissionDeadline.toISOString()}. Deadline has passed.`);
    }

    // Verify user is Team Leader if teamId is provided
    let teamId = payload.teamId;
    if (teamId) {
      const team = await prisma.team.findUnique({
        where: { id: teamId },
      });

      if (!team) {
        throw ApiError.notFound('Team not found');
      }

      if (team.leaderId !== userId) {
        throw ApiError.forbidden('Only the Team Leader is authorized to submit projects for the team');
      }
    } else {
      // Find team automatically
      const member = await prisma.teamMember.findFirst({
        where: { userId, status: 'ACCEPTED' },
        include: { team: true },
      });

      if (member && member.team.eventId === payload.eventId) {
        if (member.team.leaderId !== userId) {
          throw ApiError.forbidden('Only the Team Leader is authorized to submit projects for the team');
        }
        teamId = member.team.id;
      }
    }

    // Upsert submission
    return prisma.submission.upsert({
      where: { id: payload.teamId || `sub-${userId}-${payload.eventId}` },
      update: {
        title: payload.title,
        description: payload.description,
        repoUrl: payload.repoUrl,
        demoUrl: payload.demoUrl || null,
        videoUrl: payload.videoUrl || null,
        presentationPdfUrl: payload.presentationPdfUrl || null,
        techStack: payload.techStack || [],
        status: SubmissionStatus.SUBMITTED,
        submittedAt: new Date(),
      },
      create: {
        eventId: payload.eventId,
        teamId,
        userId,
        title: payload.title,
        description: payload.description,
        repoUrl: payload.repoUrl,
        demoUrl: payload.demoUrl || null,
        videoUrl: payload.videoUrl || null,
        presentationPdfUrl: payload.presentationPdfUrl || null,
        techStack: payload.techStack || [],
        status: SubmissionStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });
  }

  public async getTeamSubmission(teamId: string) {
    return prisma.submission.findFirst({
      where: { teamId },
      include: { event: true, team: true },
    });
  }
}
