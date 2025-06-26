import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Habit, HabitType } from '@prisma/client';

@Injectable()
export class HabitsService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string): Promise<Habit[]> {
    return this.prisma.habit.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async initializeDefaultHabits(userId: string): Promise<Habit[]> {
    const defaultHabits = [
      {
        name: 'sport',
        label: '💪 Sport (1h)',
        userId,
        type: HabitType.DAILY,
      },
      {
        name: 'reading',
        label: '📚 Lecture tech (30min)',
        userId,
        type: HabitType.DAILY,
      },
      {
        name: 'networking',
        label: '🤝 Networking (5 contacts)',
        userId,
        type: HabitType.DAILY,
      },
    ];

    // Vérifier si les habitudes existent déjà
    const existingHabits = await this.findAllByUser(userId);
    
    if (existingHabits.length === 0) {
      // Créer les habitudes par défaut
      const createdHabits = await Promise.all(
        defaultHabits.map(habit => 
          this.prisma.habit.create({ data: habit })
        )
      );
      return createdHabits;
    }

    return existingHabits;
  }

  async markCompleted(habitId: string, userId: string): Promise<Habit> {
    const habit = await this.prisma.habit.findFirst({
      where: { id: habitId, userId },
    });

    if (!habit) {
      throw new NotFoundException('Habitude non trouvée');
    }

    if (habit.completed) {
      throw new Error('Habitude déjà marquée comme terminée aujourd\'hui');
    }

    return this.prisma.habit.update({
      where: { id: habitId },
      data: {
        completed: true,
        streak: habit.streak + 1,
      },
    });
  }

  async resetDaily(userId: string): Promise<void> {
    await this.prisma.habit.updateMany({
      where: { 
        userId,
        type: HabitType.DAILY,
      },
      data: {
        completed: false,
      },
    });
  }

  async create(
    userId: string,
    habitData: {
      name: string;
      label: string;
      type?: HabitType;
    }
  ): Promise<Habit> {
    return this.prisma.habit.create({
      data: {
        ...habitData,
        userId,
        type: habitData.type || HabitType.DAILY,
      },
    });
  }

  async update(
    habitId: string,
    userId: string,
    updateData: {
      label?: string;
      streak?: number;
      completed?: boolean;
    }
  ): Promise<Habit> {
    const habit = await this.prisma.habit.findFirst({
      where: { id: habitId, userId },
    });

    if (!habit) {
      throw new NotFoundException('Habitude non trouvée');
    }

    return this.prisma.habit.update({
      where: { id: habitId },
      data: updateData,
    });
  }

  async delete(habitId: string, userId: string): Promise<Habit> {
    const habit = await this.prisma.habit.findFirst({
      where: { id: habitId, userId },
    });

    if (!habit) {
      throw new NotFoundException('Habitude non trouvée');
    }

    return this.prisma.habit.delete({
      where: { id: habitId },
    });
  }

  async getStats(userId: string) {
    const habits = await this.findAllByUser(userId);
    
    const totalHabits = habits.length;
    const completedToday = habits.filter(h => h.completed).length;
    const averageStreak = habits.length > 0 
      ? Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / habits.length)
      : 0;
    const longestStreak = habits.length > 0 
      ? Math.max(...habits.map(h => h.streak))
      : 0;

    return {
      totalHabits,
      completedToday,
      completionRate: totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0,
      averageStreak,
      longestStreak,
    };
  }
} 