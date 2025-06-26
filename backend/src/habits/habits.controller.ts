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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HabitsService } from './habits.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HabitType } from '@prisma/client';

@ApiTags('habits')
@Controller('habits')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les habitudes de l\'utilisateur' })
  findAllByUser(@Request() req) {
    return this.habitsService.findAllByUser(req.user.userId);
  }

  @Post('initialize')
  @ApiOperation({ summary: 'Initialiser les habitudes par défaut' })
  initializeDefaultHabits(@Request() req) {
    return this.habitsService.initializeDefaultHabits(req.user.userId);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Marquer une habitude comme terminée' })
  markCompleted(@Param('id') id: string, @Request() req) {
    return this.habitsService.markCompleted(id, req.user.userId);
  }

  @Post('reset-daily')
  @ApiOperation({ summary: 'Réinitialiser les habitudes quotidiennes' })
  resetDaily(@Request() req) {
    return this.habitsService.resetDaily(req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle habitude' })
  create(
    @Request() req,
    @Body() habitData: {
      name: string;
      label: string;
      type?: HabitType;
    }
  ) {
    return this.habitsService.create(req.user.userId, habitData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une habitude' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateData: {
      label?: string;
      streak?: number;
      completed?: boolean;
    }
  ) {
    return this.habitsService.update(id, req.user.userId, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une habitude' })
  remove(@Param('id') id: string, @Request() req) {
    return this.habitsService.delete(id, req.user.userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Récupérer les statistiques des habitudes' })
  getStats(@Request() req) {
    return this.habitsService.getStats(req.user.userId);
  }
} 