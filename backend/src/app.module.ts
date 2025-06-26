import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SwotModule } from './swot/swot.module';
import { HabitsModule } from './habits/habits.module';
import { TasksModule } from './tasks/tasks.module';
import { GoalsModule } from './goals/goals.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SwotModule,
    HabitsModule,
    TasksModule,
    GoalsModule,
    PomodoroModule,
    OpportunitiesModule,
    ContactsModule,
  ],
})
export class AppModule {} 