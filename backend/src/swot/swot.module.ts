import { Module } from '@nestjs/common';
import { SwotService } from './swot.service';
import { SwotController } from './swot.controller';

@Module({
  providers: [SwotService],
  controllers: [SwotController],
})
export class SwotModule {} 