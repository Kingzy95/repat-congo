import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PomodoroSession } from '@prisma/client';

@Injectable()
export class PomodoroService {
  constructor(private prisma: PrismaService) {}

  async startSession(userId: string, duration: number = 1500): Promise<PomodoroSession> {
    return this.prisma.pomodoroSession.create({
      data: {
        userId,
        duration,
        startedAt: new Date(),
      },
    });
  }

  async completeSession(sessionId: string, userId: string): Promise<PomodoroSession> {
    const session = await this.prisma.pomodoroSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new NotFoundException('Session Pomodoro non trouvée');
    }

    return this.prisma.pomodoroSession.update({
      where: { id: sessionId },
      data: {
        completed: true,
        endedAt: new Date(),
      },
    });
  }

  async getUserSessions(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ sessions: PomodoroSession[]; total: number }> {
    const skip = (page - 1) * limit;
    
    const [sessions, total] = await Promise.all([
      this.prisma.pomodoroSession.findMany({
        where: { userId },
        orderBy: { startedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.pomodoroSession.count({
        where: { userId },
      }),
    ]);

    return { sessions, total };
  }

  async getTodayStats(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaySessions = await this.prisma.pomodoroSession.findMany({
      where: {
        userId,
        startedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const completedSessions = todaySessions.filter(s => s.completed);
    const totalMinutes = completedSessions.reduce((sum, s) => sum + Math.floor(s.duration / 60), 0);

    return {
      sessionsToday: todaySessions.length,
      completedToday: completedSessions.length,
      totalMinutesToday: totalMinutes,
      averageDuration: completedSessions.length > 0 
        ? Math.round(completedSessions.reduce((sum, s) => sum + s.duration, 0) / completedSessions.length)
        : 0,
    };
  }

  async getWeeklyStats(userId: string) {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklySessions = await this.prisma.pomodoroSession.findMany({
      where: {
        userId,
        startedAt: {
          gte: weekAgo,
        },
      },
      orderBy: { startedAt: 'asc' },
    });

    const completedSessions = weeklySessions.filter(s => s.completed);
    const totalMinutes = completedSessions.reduce((sum, s) => sum + Math.floor(s.duration / 60), 0);

    // Grouper par jour
    const dailyStats = {};
    completedSessions.forEach(session => {
      const day = session.startedAt.toISOString().split('T')[0];
      if (!dailyStats[day]) {
        dailyStats[day] = { sessions: 0, minutes: 0 };
      }
      dailyStats[day].sessions++;
      dailyStats[day].minutes += Math.floor(session.duration / 60);
    });

    return {
      totalSessions: weeklySessions.length,
      completedSessions: completedSessions.length,
      totalMinutes,
      averageSessionsPerDay: Math.round(completedSessions.length / 7),
      dailyBreakdown: dailyStats,
    };
  }

  async deleteSession(sessionId: string, userId: string): Promise<PomodoroSession> {
    const session = await this.prisma.pomodoroSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new NotFoundException('Session Pomodoro non trouvée');
    }

    return this.prisma.pomodoroSession.delete({
      where: { id: sessionId },
    });
  }
} 