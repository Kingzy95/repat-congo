import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SwotAnalysis, Prisma } from '@prisma/client';

@Injectable()
export class SwotService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<SwotAnalysis | null> {
    return this.prisma.swotAnalysis.findUnique({
      where: { userId },
    });
  }

  async createOrUpdate(
    userId: string,
    swotData: {
      forces?: string[];
      faiblesses?: string[];
      opportunites?: string[];
      menaces?: string[];
    }
  ): Promise<SwotAnalysis> {
    const existingSwot = await this.findByUserId(userId);

    if (existingSwot) {
      return this.prisma.swotAnalysis.update({
        where: { userId },
        data: {
          forces: swotData.forces || existingSwot.forces,
          faiblesses: swotData.faiblesses || existingSwot.faiblesses,
          opportunites: swotData.opportunites || existingSwot.opportunites,
          menaces: swotData.menaces || existingSwot.menaces,
        },
      });
    } else {
      return this.prisma.swotAnalysis.create({
        data: {
          userId,
          forces: swotData.forces || [],
          faiblesses: swotData.faiblesses || [],
          opportunites: swotData.opportunites || [],
          menaces: swotData.menaces || [],
        },
      });
    }
  }

  async addItem(userId: string, category: 'forces' | 'faiblesses' | 'opportunites' | 'menaces', item: string): Promise<SwotAnalysis> {
    const swot = await this.findByUserId(userId);
    
    if (!swot) {
      // Créer une nouvelle analyse SWOT si elle n'existe pas
      const newData = { [category]: [item] };
      return this.createOrUpdate(userId, newData);
    }

    const currentItems = swot[category] as string[];
    const updatedItems = [...currentItems, item];

    return this.prisma.swotAnalysis.update({
      where: { userId },
      data: { [category]: updatedItems },
    });
  }

  async removeItem(userId: string, category: 'forces' | 'faiblesses' | 'opportunites' | 'menaces', index: number): Promise<SwotAnalysis> {
    const swot = await this.findByUserId(userId);
    
    if (!swot) {
      throw new NotFoundException('Analyse SWOT non trouvée');
    }

    const currentItems = swot[category] as string[];
    const updatedItems = currentItems.filter((_, i) => i !== index);

    return this.prisma.swotAnalysis.update({
      where: { userId },
      data: { [category]: updatedItems },
    });
  }

  async generateRecommendations(userId: string) {
    const swot = await this.findByUserId(userId);
    
    if (!swot) {
      return { recommendations: [] };
    }

    const recommendations = [];

    // Stratégies Forces-Opportunités
    if (swot.forces.length > 0 && swot.opportunites.length > 0) {
      recommendations.push({
        type: 'FO',
        title: 'Exploiter vos forces pour saisir les opportunités',
        description: 'Utilisez vos compétences techniques et votre vision entrepreneuriale pour capitaliser sur la croissance économique du Congo.',
      });
    }

    // Stratégies Forces-Menaces
    if (swot.forces.length > 0 && swot.menaces.length > 0) {
      recommendations.push({
        type: 'FT',
        title: 'Utiliser vos forces pour contrer les menaces',
        description: 'Votre expertise technique peut vous aider à vous différencier de la concurrence internationale.',
      });
    }

    // Stratégies Faiblesses-Opportunités
    if (swot.faiblesses.length > 0 && swot.opportunites.length > 0) {
      recommendations.push({
        type: 'WO',
        title: 'Corriger les faiblesses pour saisir les opportunités',
        description: 'Développez votre réseau local et votre connaissance du marché congolais pour mieux exploiter les opportunités.',
      });
    }

    // Stratégies Faiblesses-Menaces
    if (swot.faiblesses.length > 0 && swot.menaces.length > 0) {
      recommendations.push({
        type: 'WT',
        title: 'Minimiser les faiblesses et éviter les menaces',
        description: 'Établissez des partenariats locaux pour réduire les risques et compenser votre manque d\'expérience terrain.',
      });
    }

    return { recommendations };
  }
} 