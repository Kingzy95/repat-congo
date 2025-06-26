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
import { SwotService } from './swot.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('swot')
@Controller('swot')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SwotController {
  constructor(private readonly swotService: SwotService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer l\'analyse SWOT de l\'utilisateur' })
  findUserSwot(@Request() req) {
    return this.swotService.findByUserId(req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Créer ou mettre à jour l\'analyse SWOT' })
  createOrUpdate(
    @Request() req,
    @Body() swotData: {
      forces?: string[];
      faiblesses?: string[];
      opportunites?: string[];
      menaces?: string[];
    }
  ) {
    return this.swotService.createOrUpdate(req.user.userId, swotData);
  }

  @Post('add-item')
  @ApiOperation({ summary: 'Ajouter un élément à une catégorie SWOT' })
  addItem(
    @Request() req,
    @Body() data: {
      category: 'forces' | 'faiblesses' | 'opportunites' | 'menaces';
      item: string;
    }
  ) {
    return this.swotService.addItem(req.user.userId, data.category, data.item);
  }

  @Delete('remove-item')
  @ApiOperation({ summary: 'Supprimer un élément d\'une catégorie SWOT' })
  removeItem(
    @Request() req,
    @Body() data: {
      category: 'forces' | 'faiblesses' | 'opportunites' | 'menaces';
      index: number;
    }
  ) {
    return this.swotService.removeItem(req.user.userId, data.category, data.index);
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Générer des recommandations basées sur l\'analyse SWOT' })
  generateRecommendations(@Request() req) {
    return this.swotService.generateRecommendations(req.user.userId);
  }
} 