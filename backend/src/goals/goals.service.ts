import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Goal } from '@prisma/client';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string, category?: string): Promise<Goal[]> {
    const where: any = { userId };
    if (category) where.category = category;

    return this.prisma.goal.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(
    userId: string,
    goalData: {
      title: string;
      description?: string;
      target?: number;
      unit?: string;
      deadline?: Date;
      category?: string;
    }
  ): Promise<Goal> {
    return this.prisma.goal.create({
      data: {
        ...goalData,
        userId,
        target: goalData.target || 100,
      },
    });
  }

  async initializeSMARTGoals(userId: string): Promise<Goal[]> {
    const existingGoals = await this.findAllByUser(userId, 'smart-goals');
    
    if (existingGoals.length > 0) {
      return existingGoals;
    }

    // Objectifs SMART par défaut basés sur votre application
    const defaultGoals = [
      {
        title: 'Réseau professionnel Congo',
        description: 'Établir un réseau de 50 contacts professionnels locaux',
        target: 50,
        unit: 'contacts',
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 mois
        category: 'smart-goals',
        progress: 5, // Déjà quelques contacts
      },
      {
        title: 'Financement initial',
        description: 'Lever 25 000 000 FCFA pour démarrer l\'entreprise',
        target: 25000000,
        unit: 'FCFA',
        deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 mois
        category: 'smart-goals',
        progress: 0,
      },
      {
        title: 'Premiers clients pilotes',
        description: 'Acquérir 5 clients pour tester le MVP',
        target: 5,
        unit: 'clients',
        deadline: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000), // 2.5 mois
        category: 'smart-goals',
        progress: 0,
      },
      {
        title: 'Formation équipe technique',
        description: 'Recruter et former 3 développeurs locaux',
        target: 3,
        unit: 'développeurs',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 2 mois
        category: 'smart-goals',
        progress: 0,
      },
      {
        title: 'Certification réglementaire',
        description: 'Obtenir toutes les autorisations pour opérer des drones',
        target: 100,
        unit: '% complet',
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 1.5 mois
        category: 'smart-goals',
        progress: 20, // Déjà commencé les démarches
      }
    ];

    const createdGoals = await Promise.all(
      defaultGoals.map(goal => 
        this.prisma.goal.create({
          data: { ...goal, userId }
        })
      )
    );

    return createdGoals;
  }

  async findOne(id: string, userId: string): Promise<Goal | null> {
    return this.prisma.goal.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: string,
    userId: string,
    updateData: {
      title?: string;
      description?: string;
      progress?: number;
      target?: number;
      unit?: string;
      deadline?: Date;
    }
  ): Promise<Goal> {
    const goal = await this.findOne(id, userId);
    
    if (!goal) {
      throw new NotFoundException('Objectif non trouvé');
    }

    // Valider que le progrès ne dépasse pas la cible
    if (updateData.progress !== undefined && updateData.progress > (updateData.target || goal.target)) {
      updateData.progress = updateData.target || goal.target;
    }

    return this.prisma.goal.update({
      where: { id },
      data: updateData,
    });
  }

  async updateProgress(id: string, userId: string, progress: number): Promise<Goal> {
    const goal = await this.findOne(id, userId);
    
    if (!goal) {
      throw new NotFoundException('Objectif non trouvé');
    }

    // Assurer que le progrès ne dépasse pas la cible
    const validProgress = Math.min(Math.max(0, progress), goal.target);

    return this.prisma.goal.update({
      where: { id },
      data: { progress: validProgress },
    });
  }

  async delete(id: string, userId: string): Promise<Goal> {
    const goal = await this.findOne(id, userId);
    
    if (!goal) {
      throw new NotFoundException('Objectif non trouvé');
    }

    return this.prisma.goal.delete({
      where: { id },
    });
  }

  async getGoalStats(userId: string) {
    const allGoals = await this.findAllByUser(userId);
    
    if (allGoals.length === 0) {
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        overdue: 0,
        averageProgress: 0,
        upcomingDeadlines: [],
      };
    }

    const completedGoals = allGoals.filter(g => g.progress >= g.target);
    const inProgressGoals = allGoals.filter(g => g.progress > 0 && g.progress < g.target);
    const now = new Date();
    const overdueGoals = allGoals.filter(g => 
      g.deadline && new Date(g.deadline) < now && g.progress < g.target
    );

    // Objectifs avec échéances dans les 7 prochains jours
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingDeadlines = allGoals
      .filter(g => g.deadline && new Date(g.deadline) <= nextWeek && new Date(g.deadline) >= now && g.progress < g.target)
      .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
      .slice(0, 5); // Top 5

    const totalProgress = allGoals.reduce((sum, g) => sum + (g.progress / g.target * 100), 0);
    const averageProgress = Math.round(totalProgress / allGoals.length);

    return {
      total: allGoals.length,
      completed: completedGoals.length,
      inProgress: inProgressGoals.length,
      overdue: overdueGoals.length,
      completionRate: Math.round((completedGoals.length / allGoals.length) * 100),
      averageProgress,
      upcomingDeadlines: upcomingDeadlines.map(g => ({
        id: g.id,
        title: g.title,
        deadline: g.deadline,
        progress: g.progress,
        target: g.target,
        unit: g.unit,
      })),
    };
  }

  async getProgressTrend(userId: string, goalId: string, days: number = 30) {
    // Pour une future implémentation avec historique des progrès
    // Ici on retourne le progrès actuel
    const goal = await this.findOne(goalId, userId);
    
    if (!goal) {
      throw new NotFoundException('Objectif non trouvé');
    }

    return {
      current: goal.progress,
      target: goal.target,
      progressPercentage: Math.round((goal.progress / goal.target) * 100),
      isCompleted: goal.progress >= goal.target,
      daysToDeadline: goal.deadline 
        ? Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : null,
    };
  }
} 