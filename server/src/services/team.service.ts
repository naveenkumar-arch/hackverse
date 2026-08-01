import { TeamRepository } from '../repositories/team.repository';
import { ApiError } from '../utils/apiError';
import { prisma } from '../config/db.config';
import { TeamMemberRole, RegistrationStatus } from '@prisma/client';

export class TeamService {
  private teamRepository: TeamRepository;

  constructor() {
    this.teamRepository = new TeamRepository();
  }

  public async createTeam(leaderId: string, payload: { name: string; eventId: string; maxMembers?: number }) {
    // Check if user is already in an active team for this event
    const existingTeam = await this.teamRepository.findUserTeam(leaderId);
    if (existingTeam && existingTeam.eventId === payload.eventId) {
      throw ApiError.conflict('You are already part of a team for this event');
    }

    const shortCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const teamIdCode = `TM-${Math.floor(10000 + Math.random() * 90000)}`;
    const teamPassword = `SEC-${Math.floor(1000 + Math.random() * 9000)}`;

    return this.teamRepository.create({
      name: payload.name,
      eventId: payload.eventId,
      leaderId,
      code: shortCode,
      teamIdCode,
      teamPassword,
      maxMembers: payload.maxMembers || 4,
      members: {
        create: {
          userId: leaderId,
          role: TeamMemberRole.LEADER,
          status: 'ACCEPTED',
        },
      },
    });
  }

  public async joinTeam(userId: string, payload: { teamIdCode: string; teamPassword: string }) {
    const team = await this.teamRepository.findByTeamIdCode(payload.teamIdCode.trim());
    if (!team) {
      throw ApiError.notFound('Invalid Team ID');
    }

    if (team.teamPassword !== payload.teamPassword.trim()) {
      throw ApiError.badRequest('Invalid Team Password');
    }

    if (team.isLocked) {
      throw ApiError.badRequest('This team is currently locked by the Leader and not accepting new members');
    }

    const acceptedCount = team.members.filter((m) => m.status === 'ACCEPTED').length;
    if (acceptedCount >= team.maxMembers) {
      throw ApiError.badRequest(`This team has reached its maximum capacity of ${team.maxMembers} members`);
    }

    const existingMember = team.members.find((m) => m.userId === userId);
    if (existingMember) {
      if (existingMember.status === 'ACCEPTED') {
        throw ApiError.conflict('You are already an accepted member of this team');
      }
      if (existingMember.status === 'PENDING') {
        throw ApiError.conflict('You already have a pending join request for this team');
      }
    }

    return prisma.teamMember.create({
      data: {
        teamId: team.id,
        userId,
        role: TeamMemberRole.MEMBER,
        status: 'PENDING',
      },
    });
  }

  public async getMyTeam(userId: string) {
    const team = await this.teamRepository.findUserTeam(userId);
    if (!team) {
      return null;
    }

    const pendingRequests = team.members.filter((m) => m.status === 'PENDING');
    const acceptedMembers = team.members.filter((m) => m.status === 'ACCEPTED');
    const isLeader = team.leaderId === userId;

    return {
      team,
      isLeader,
      pendingRequests,
      acceptedMembers,
      registrationStatus: team.registrationStatus,
    };
  }

  public async acceptMember(leaderId: string, teamId: string, targetUserId: string) {
    await this.verifyLeader(leaderId, teamId);

    const member = await prisma.teamMember.findUnique({
      where: { teamId_userId: { teamId, userId: targetUserId } },
    });

    if (!member) {
      throw ApiError.notFound('Join request not found');
    }

    return prisma.teamMember.update({
      where: { teamId_userId: { teamId, userId: targetUserId } },
      data: { status: 'ACCEPTED' },
    });
  }

  public async rejectMember(leaderId: string, teamId: string, targetUserId: string) {
    await this.verifyLeader(leaderId, teamId);

    return prisma.teamMember.update({
      where: { teamId_userId: { teamId, userId: targetUserId } },
      data: { status: 'REJECTED' },
    });
  }

  public async removeMember(leaderId: string, teamId: string, targetUserId: string) {
    await this.verifyLeader(leaderId, teamId);

    if (leaderId === targetUserId) {
      throw ApiError.badRequest('Leader cannot remove themselves. Transfer leadership or delete the team instead.');
    }

    return prisma.teamMember.delete({
      where: { teamId_userId: { teamId, userId: targetUserId } },
    });
  }

  public async transferLeadership(leaderId: string, teamId: string, targetUserId: string) {
    await this.verifyLeader(leaderId, teamId);

    const targetMember = await prisma.teamMember.findUnique({
      where: { teamId_userId: { teamId, userId: targetUserId } },
    });

    if (!targetMember || targetMember.status !== 'ACCEPTED') {
      throw ApiError.badRequest('Leadership can only be transferred to an accepted team member');
    }

    await prisma.$transaction([
      prisma.team.update({
        where: { id: teamId },
        data: { leaderId: targetUserId },
      }),
      prisma.teamMember.update({
        where: { teamId_userId: { teamId, userId: leaderId } },
        data: { role: TeamMemberRole.MEMBER },
      }),
      prisma.teamMember.update({
        where: { teamId_userId: { teamId, userId: targetUserId } },
        data: { role: TeamMemberRole.LEADER },
      }),
    ]);

    return { message: 'Leadership transferred successfully' };
  }

  public async toggleLock(leaderId: string, teamId: string) {
    const team = await this.verifyLeader(leaderId, teamId);

    return prisma.team.update({
      where: { id: teamId },
      data: { isLocked: !team.isLocked },
    });
  }

  public async deleteTeam(leaderId: string, teamId: string) {
    await this.verifyLeader(leaderId, teamId);

    return prisma.team.delete({
      where: { id: teamId },
    });
  }

  public async registerTeamForEvent(leaderId: string, teamId: string) {
    const team = await this.verifyLeader(leaderId, teamId);

    const acceptedMembers = team.members.filter((m) => m.status === 'ACCEPTED');
    if (acceptedMembers.length < 1) {
      throw ApiError.badRequest('Team must have at least 1 member to register');
    }

    // Register all accepted members for the event
    await prisma.$transaction([
      prisma.team.update({
        where: { id: teamId },
        data: { registrationStatus: 'REGISTERED' },
      }),
      ...acceptedMembers.map((m) =>
        prisma.registration.upsert({
          where: { eventId_userId: { eventId: team.eventId, userId: m.userId } },
          update: { teamId, status: RegistrationStatus.APPROVED },
          create: {
            eventId: team.eventId,
            userId: m.userId,
            teamId,
            status: RegistrationStatus.APPROVED,
          },
        })
      ),
    ]);

    return { message: 'Team successfully registered for event!', registrationStatus: 'REGISTERED' };
  }

  public async getAllTeamsAdmin() {
    return this.teamRepository.findAllTeamsAdmin();
  }

  private async verifyLeader(userId: string, teamId: string) {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true },
    });

    if (!team) {
      throw ApiError.notFound('Team not found');
    }

    if (team.leaderId !== userId) {
      throw ApiError.forbidden('Only the Team Leader is authorized to perform this action');
    }

    return team;
  }
}
