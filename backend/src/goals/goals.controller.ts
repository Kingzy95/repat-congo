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
import { GoalsService } from './goals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('goals')
@Controller('goals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les objectifs de l\'utilisateur' })
  findAllByUser(@Request() req, @Query('category') category?: string) {
    return this.goalsService.findAllByUser(req.user.userId, category);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel objectif' })
  create(
    @Request() req,
    @Body() goalData: {
      title: string;
      description?: string;
      target?: number;
      unit?: string;
      deadline?: string;
      category?: string;
    }
  ) {
    const data = {
      ...goalData,
      deadline: goalData.deadline ? new Date(goalData.deadline) : undefined,
    };
    return this.goalsService.create(req.user.userId, data);
  }

  @Post('initialize-smart')
  @ApiOperation({ summary: 'Initialiser les objectifs SMART par défaut' })
  initializeSMARTGoals(@Request() req) {
    return this.goalsService.initializeSMARTGoals(req.user.userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Récupérer les statistiques des objectifs' })
  getGoalStats(@Request() req) {
    return this.goalsService.getGoalStats(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un objectif par ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.goalsService.findOne(id, req.user.userId);
  }

  @Get(':id/progress-trend')
  @ApiOperation({ summary: 'Récupérer la tendance de progrès d\'un objectif' })
  getProgressTrend(
    @Param('id') id: string,
    @Request() req,
    @Query('days') days?: string
  ) {
    const daysNum = days ? parseInt(days, 10) : 30;
    return this.goalsService.getProgressTrend(req.user.userId, id, daysNum);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un objectif' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateData: {
      title?: string;
      description?: string;
      progress?: number;
      target?: number;
      unit?: string;
      deadline?: string;
    }
  ) {
    const data = {
      ...updateData,
      deadline: updateData.deadline ? new Date(updateData.deadline) : undefined,
    };
    return this.goalsService.update(id, req.user.userId, data);
  }

  @Post(':id/progress')
  @ApiOperation({ summary: 'Mettre à jour le progrès d\'un objectif' })
  updateProgress(
    @Param('id') id: string,
    @Request() req,
    @Body() data: { progress: number }
  ) {
    return this.goalsService.updateProgress(id, req.user.userId, data.progress);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un objectif' })
  remove(@Param('id') id: string, @Request() req) {
    return this.goalsService.delete(id, req.user.userId);
  }
} 