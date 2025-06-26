import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, TaskPriority } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(
    userId: string,
    options?: {
      category?: string;
      section?: string;
      completed?: boolean;
      priority?: TaskPriority;
    }
  ): Promise<Task[]> {
    const where: any = { userId };
    
    if (options?.category) where.category = options.category;
    if (options?.section) where.section = options.section;
    if (options?.completed !== undefined) where.completed = options.completed;
    if (options?.priority) where.priority = options.priority;

    return this.prisma.task.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' },
        { createdAt: 'desc' }
      ],
    });
  }

  async create(
    userId: string,
    taskData: {
      title: string;
      description?: string;
      category?: string;
      section?: string;
      priority?: TaskPriority;
      dueDate?: Date;
    }
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...taskData,
        userId,
        priority: taskData.priority || TaskPriority.MEDIUM,
      },
    });
  }

  async initializePlanningTasks(userId: string): Promise<Task[]> {
    const existingTasks = await this.findAllByUser(userId, { category: 'planning' });
    
    if (existingTasks.length > 0) {
      return existingTasks;
    }

    // Tâches par défaut basées sur votre application actuelle
    const defaultTasks = [
      // Mois 1 - Préparation
      {
        title: 'Finaliser business plan drones',
        description: 'Compléter l\'étude de marché et le modèle économique',
        category: 'planning',
        section: 'month1',
        priority: TaskPriority.HIGH,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
      },
      {
        title: 'Contacter CARIA pour partenariat',
        description: 'Établir des liens avec le Centre d\'IA de Brazzaville',
        category: 'planning',
        section: 'month1',
        priority: TaskPriority.HIGH,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 jours
      },
      {
        title: 'Étudier réglementation drone Congo',
        description: 'Comprendre les lois et autorisations nécessaires',
        category: 'planning',
        section: 'month1',
        priority: TaskPriority.MEDIUM,
        dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 jours
      },
      // Mois 2 - Réseau et Financement
      {
        title: 'Développer réseau professionnel local',
        description: 'Participer aux événements entrepreneuriaux',
        category: 'planning',
        section: 'month2',
        priority: TaskPriority.HIGH,
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 jours
      },
      {
        title: 'Rechercher sources de financement',
        description: 'Identifier investisseurs et subventions disponibles',
        category: 'planning',
        section: 'month2',
        priority: TaskPriority.HIGH,
        dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 jours
      },
      // Mois 3 - Prototypage
      {
        title: 'Développer MVP application drone',
        description: 'Créer le prototype fonctionnel',
        category: 'planning',
        section: 'month3',
        priority: TaskPriority.HIGH,
        dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 jours
      },
      {
        title: 'Tester sur marché pilote',
        description: 'Validation concept avec premiers clients',
        category: 'planning',
        section: 'month3',
        priority: TaskPriority.MEDIUM,
        dueDate: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000), // 85 jours
      },
      // Mois 4 - Lancement
      {
        title: 'Finaliser structure juridique',
        description: 'Créer l\'entreprise et obtenir les licences',
        category: 'planning',
        section: 'month4',
        priority: TaskPriority.HIGH,
        dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 jours
      },
      {
        title: 'Lancer version commerciale',
        description: 'Déploiement officiel sur le marché',
        category: 'planning',
        section: 'month4',
        priority: TaskPriority.HIGH,
        dueDate: new Date(Date.now() + 115 * 24 * 60 * 60 * 1000), // 115 jours
      }
    ];

    const createdTasks = await Promise.all(
      defaultTasks.map(task => 
        this.prisma.task.create({
          data: { ...task, userId }
        })
      )
    );

    return createdTasks;
  }

  async findOne(id: string, userId: string): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: string,
    userId: string,
    updateData: {
      title?: string;
      description?: string;
      completed?: boolean;
      priority?: TaskPriority;
      dueDate?: Date;
    }
  ): Promise<Task> {
    const task = await this.findOne(id, userId);
    
    if (!task) {
      throw new NotFoundException('Tâche non trouvée');
    }

    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string, userId: string): Promise<Task> {
    const task = await this.findOne(id, userId);
    
    if (!task) {
      throw new NotFoundException('Tâche non trouvée');
    }

    return this.prisma.task.delete({
      where: { id },
    });
  }

  async getTaskStats(userId: string) {
    const allTasks = await this.findAllByUser(userId);
    const completedTasks = allTasks.filter(t => t.completed);
    const pendingTasks = allTasks.filter(t => !t.completed);
    
    // Tâches par priorité
    const highPriority = allTasks.filter(t => t.priority === TaskPriority.HIGH && !t.completed);
    const overdueTasks = pendingTasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date());
    
    // Tâches par section (planning)
    const planningStats = {};
    const planningTasks = allTasks.filter(t => t.category === 'planning');
    planningTasks.forEach(task => {
      const section = task.section || 'other';
      if (!planningStats[section]) {
        planningStats[section] = { total: 0, completed: 0 };
      }
      planningStats[section].total++;
      if (task.completed) planningStats[section].completed++;
    });

    return {
      total: allTasks.length,
      completed: completedTasks.length,
      pending: pendingTasks.length,
      completionRate: allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0,
      highPriority: highPriority.length,
      overdue: overdueTasks.length,
      planningProgress: planningStats,
    };
  }

  async toggleComplete(id: string, userId: string): Promise<Task> {
    const task = await this.findOne(id, userId);
    
    if (!task) {
      throw new NotFoundException('Tâche non trouvée');
    }

    return this.prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });
  }
} 