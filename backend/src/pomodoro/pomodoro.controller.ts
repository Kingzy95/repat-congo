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
import { PomodoroService } from './pomodoro.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('pomodoro')
@Controller('pomodoro')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Post('start')
  @ApiOperation({ summary: 'Démarrer une nouvelle session Pomodoro' })
  startSession(
    @Request() req,
    @Body() data: { duration?: number }
  ) {
    return this.pomodoroService.startSession(req.user.userId, data.duration);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Marquer une session comme terminée' })
  completeSession(@Param('id') id: string, @Request() req) {
    return this.pomodoroService.completeSession(id, req.user.userId);
  }

  @Get('sessions')
  @ApiOperation({ summary: 'Récupérer les sessions de l\'utilisateur' })
  getUserSessions(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.pomodoroService.getUserSessions(req.user.userId, pageNum, limitNum);
  }

  @Get('stats/today')
  @ApiOperation({ summary: 'Statistiques du jour' })
  getTodayStats(@Request() req) {
    return this.pomodoroService.getTodayStats(req.user.userId);
  }

  @Get('stats/weekly')
  @ApiOperation({ summary: 'Statistiques de la semaine' })
  getWeeklyStats(@Request() req) {
    return this.pomodoroService.getWeeklyStats(req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une session Pomodoro' })
  deleteSession(@Param('id') id: string, @Request() req) {
    return this.pomodoroService.deleteSession(id, req.user.userId);
  }
} 