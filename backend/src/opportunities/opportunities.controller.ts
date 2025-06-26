import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OpportunitiesService } from './opportunities.service';

@ApiTags('opportunities')
@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les opportunités de marché' })
  findAll(@Query('sector') sector?: string) {
    return this.opportunitiesService.findAll(sector);
  }

  @Get('sector/:sector')
  @ApiOperation({ summary: 'Récupérer les opportunités par secteur' })
  findBySector(@Param('sector') sector: string) {
    return this.opportunitiesService.findBySector(sector);
  }

  @Post('initialize')
  @ApiOperation({ summary: 'Initialiser les opportunités par défaut' })
  initializeOpportunities() {
    return this.opportunitiesService.initializeOpportunities();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Récupérer les statistiques des opportunités' })
  getOpportunityStats() {
    return this.opportunitiesService.getOpportunityStats();
  }

  @Get('search/:query')
  @ApiOperation({ summary: 'Rechercher des opportunités' })
  searchOpportunities(@Param('query') query: string) {
    return this.opportunitiesService.searchOpportunities(query);
  }

  @Post('recommendations')
  @ApiOperation({ summary: 'Obtenir des recommandations personnalisées' })
  getRecommendations(
    @Body() userProfile?: {
      skills?: string[];
      interests?: string[];
      experience?: string;
    }
  ) {
    return this.opportunitiesService.getRecommendationsForUser(userProfile);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une opportunité par ID' })
  findOne(@Param('id') id: string) {
    return this.opportunitiesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle opportunité' })
  create(
    @Body() opportunityData: {
      sector: string;
      category: string;
      title: string;
      description?: string;
      potential: string;
      competition: string;
      roi: string;
      score?: number;
    }
  ) {
    return this.opportunitiesService.create(opportunityData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une opportunité' })
  update(
    @Param('id') id: string,
    @Body() updateData: {
      title?: string;
      description?: string;
      potential?: string;
      competition?: string;
      roi?: string;
      score?: number;
    }
  ) {
    return this.opportunitiesService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une opportunité' })
  remove(@Param('id') id: string) {
    return this.opportunitiesService.delete(id);
  }
} 