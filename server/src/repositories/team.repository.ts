import { Team } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { prisma } from '../config/db.config';

export class TeamRepository extends BaseRepository<Team> {
  constructor() {
    super(prisma, 'team');
  }

  async findByTeamIdCode(teamIdCode: string): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where: { teamIdCode },
      include: {
        event: true,
        leader: {
          select: { id: true, fullName: true, email: true, avatarUrl: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true, avatarUrl: true, college: true },
            },
          },
        },
      },
    });
  }

  async findUserTeam(userId: string): Promise<Team | null> {
    const member = await this.prisma.teamMember.findFirst({
      where: { userId, status: { in: ['ACCEPTED', 'PENDING'] } },
      include: {
        team: {
          include: {
            event: true,
            leader: {
              select: { id: true, fullName: true, email: true, avatarUrl: true },
            },
            members: {
              include: {
                user: {
                  select: { id: true, fullName: true, email: true, avatarUrl: true, college: true },
                },
              },
            },
          },
        },
      },
    });
    return member?.team || null;
  }

  async findAllTeamsAdmin(): Promise<Team[]> {
    return this.prisma.team.findMany({
      include: {
        event: true,
        leader: {
          select: { id: true, fullName: true, email: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
