import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskPriority } from '@prisma/client';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les tâches de l\'utilisateur' })
  findAllByUser(
    @Request() req,
    @Query('category') category?: string,
    @Query('section') section?: string,
    @Query('completed') completed?: string,
    @Query('priority') priority?: TaskPriority
  ) {
    const options: any = {};
    if (category) options.category = category;
    if (section) options.section = section;
    if (completed !== undefined) options.completed = completed === 'true';
    if (priority) options.priority = priority;

    return this.tasksService.findAllByUser(req.user.userId, options);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle tâche' })
  create(
    @Request() req,
    @Body() taskData: {
      title: string;
      description?: string;
      category?: string;
      section?: string;
      priority?: TaskPriority;
      dueDate?: string;
    }
  ) {
    const data = {
      ...taskData,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
    };
    return this.tasksService.create(req.user.userId, data);
  }

  @Post('initialize-planning')
  @ApiOperation({ summary: 'Initialiser les tâches de planning par défaut' })
  initializePlanningTasks(@Request() req) {
    return this.tasksService.initializePlanningTasks(req.user.userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Récupérer les statistiques des tâches' })
  getTaskStats(@Request() req) {
    return this.tasksService.getTaskStats(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateData: {
      title?: string;
      description?: string;
      completed?: boolean;
      priority?: TaskPriority;
      dueDate?: string;
    }
  ) {
    const data = {
      ...updateData,
      dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
    };
    return this.tasksService.update(id, req.user.userId, data);
  }

  @Post(':id/toggle')
  @ApiOperation({ summary: 'Basculer l\'état terminé d\'une tâche' })
  toggleComplete(@Param('id') id: string, @Request() req) {
    return this.tasksService.toggleComplete(id, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une tâche' })
  remove(@Param('id') id: string, @Request() req) {
    return this.tasksService.delete(id, req.user.userId);
  }
} 