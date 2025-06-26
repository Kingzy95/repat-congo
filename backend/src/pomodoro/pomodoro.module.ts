import { Module } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { PomodoroController } from './pomodoro.controller';

@Module({
  providers: [PomodoroService],
  controllers: [PomodoroController],
})
export class PomodoroModule {} 