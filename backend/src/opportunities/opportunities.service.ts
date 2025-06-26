import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MarketOpportunity } from '@prisma/client';

@Injectable()
export class OpportunitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(sector?: string): Promise<MarketOpportunity[]> {
    const where = sector ? { sector } : {};
    
    return this.prisma.marketOpportunity.findMany({
      where,
      orderBy: { score: 'desc' },
    });
  }

  async findBySector(sector: string): Promise<MarketOpportunity[]> {
    return this.prisma.marketOpportunity.findMany({
      where: { sector },
      orderBy: { score: 'desc' },
    });
  }

  async initializeOpportunities(): Promise<MarketOpportunity[]> {
    const existingOpportunities = await this.findAll();
    
    if (existingOpportunities.length > 0) {
      return existingOpportunities;
    }

    // Opportunités basées sur vos fichiers CSV
    const defaultOpportunities = [
      // Secteur Drones
      {
        sector: 'drones',
        category: 'petrole',
        title: 'Surveillance pipeline pétrolier',
        description: 'Inspection automatisée des infrastructures pétrolières par drones',
        potential: '2B-5B FCFA',
        competition: 'Très faible',
        roi: '6-12 mois',
        score: 9,
      },
      {
        sector: 'drones',
        category: 'agriculture',
        title: 'Cartographie agricole intelligente',
        description: 'Optimisation des rendements par analyse drone et IA',
        potential: '500M-2B FCFA',
        competition: 'Faible',
        roi: '8-15 mois',
        score: 8,
      },
      {
        sector: 'drones',
        category: 'securite',
        title: 'Surveillance urbaine automatisée',
        description: 'Sécurisation des zones urbaines avec drones autonomes',
        potential: '1B-3B FCFA',
        competition: 'Moyenne',
        roi: '12-18 mois',
        score: 7,
      },
      {
        sector: 'drones',
        category: 'livraison',
        title: 'Livraison médicale d\'urgence',
        description: 'Transport rapide de médicaments en zones reculées',
        potential: '800M-2B FCFA',
        competition: 'Faible',
        roi: '10-16 mois',
        score: 8,
      },
      
      // Secteur SI (Systèmes d\'Information)
      {
        sector: 'si',
        category: 'fintech',
        title: 'Plateforme microfinance digitale',
        description: 'Solution de crédit mobile pour entrepreneurs locaux',
        potential: '3B-8B FCFA',
        competition: 'Moyenne',
        roi: '18-24 mois',
        score: 8,
      },
      {
        sector: 'si',
        category: 'ecommerce',
        title: 'Marketplace produits locaux',
        description: 'Plateforme e-commerce pour artisans congolais',
        potential: '1B-4B FCFA',
        competition: 'Élevée',
        roi: '15-30 mois',
        score: 6,
      },
      {
        sector: 'si',
        category: 'edutech',
        title: 'Formation professionnelle en ligne',
        description: 'Plateforme d\'apprentissage adaptée au marché congolais',
        potential: '500M-1.5B FCFA',
        competition: 'Faible',
        roi: '12-20 mois',
        score: 7,
      },
      {
        sector: 'si',
        category: 'govtech',
        title: 'Digitalisation services publics',
        description: 'Solutions numériques pour administration congolaise',
        potential: '5B-15B FCFA',
        competition: 'Très faible',
        roi: '24-36 mois',
        score: 9,
      }
    ];

    const createdOpportunities = await Promise.all(
      defaultOpportunities.map(opp => 
        this.prisma.marketOpportunity.create({ data: opp })
      )
    );

    return createdOpportunities;
  }

  async create(opportunityData: {
    sector: string;
    category: string;
    title: string;
    description?: string;
    potential: string;
    competition: string;
    roi: string;
    score?: number;
  }): Promise<MarketOpportunity> {
    return this.prisma.marketOpportunity.create({
      data: {
        ...opportunityData,
        score: opportunityData.score || 5,
      },
    });
  }

  async findOne(id: string): Promise<MarketOpportunity | null> {
    return this.prisma.marketOpportunity.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateData: {
      title?: string;
      description?: string;
      potential?: string;
      competition?: string;
      roi?: string;
      score?: number;
    }
  ): Promise<MarketOpportunity> {
    const opportunity = await this.findOne(id);
    
    if (!opportunity) {
      throw new NotFoundException('Opportunité non trouvée');
    }

    return this.prisma.marketOpportunity.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<MarketOpportunity> {
    const opportunity = await this.findOne(id);
    
    if (!opportunity) {
      throw new NotFoundException('Opportunité non trouvée');
    }

    return this.prisma.marketOpportunity.delete({
      where: { id },
    });
  }

  async getOpportunityStats() {
    const allOpportunities = await this.findAll();
    
    if (allOpportunities.length === 0) {
      return {
        total: 0,
        sectors: {},
        averageScore: 0,
        topOpportunities: [],
      };
    }

    // Stats par secteur
    const sectorStats = {};
    allOpportunities.forEach(opp => {
      if (!sectorStats[opp.sector]) {
        sectorStats[opp.sector] = {
          count: 0,
          averageScore: 0,
          totalScore: 0,
        };
      }
      sectorStats[opp.sector].count++;
      sectorStats[opp.sector].totalScore += opp.score;
      sectorStats[opp.sector].averageScore = Math.round(
        sectorStats[opp.sector].totalScore / sectorStats[opp.sector].count
      );
    });

    const averageScore = Math.round(
      allOpportunities.reduce((sum, opp) => sum + opp.score, 0) / allOpportunities.length
    );

    const topOpportunities = allOpportunities
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(opp => ({
        id: opp.id,
        title: opp.title,
        sector: opp.sector,
        score: opp.score,
        potential: opp.potential,
      }));

    return {
      total: allOpportunities.length,
      sectors: sectorStats,
      averageScore,
      topOpportunities,
    };
  }

  async searchOpportunities(query: string): Promise<MarketOpportunity[]> {
    return this.prisma.marketOpportunity.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { score: 'desc' },
    });
  }

  async getRecommendationsForUser(userProfile?: {
    skills?: string[];
    interests?: string[];
    experience?: string;
  }) {
    // Logique simple de recommandation basée sur le profil
    // Dans le futur, on pourrait utiliser de l'IA pour des recommandations plus sophistiquées
    
    const allOpportunities = await this.findAll();
    
    if (!userProfile) {
      // Retourner les meilleures opportunités par défaut
      return allOpportunities
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    }

    // Logique de scoring basée sur le profil utilisateur
    const scoredOpportunities = allOpportunities.map(opp => {
      let matchScore = opp.score;
      
      // Bonus si les compétences correspondent
      if (userProfile.skills) {
        const relevantSkills = userProfile.skills.filter(skill => 
          opp.title.toLowerCase().includes(skill.toLowerCase()) ||
          opp.description?.toLowerCase().includes(skill.toLowerCase())
        );
        matchScore += relevantSkills.length * 0.5;
      }
      
      // Bonus pour l'expérience technique
      if (userProfile.experience?.toLowerCase().includes('tech') && 
          (opp.sector === 'si' || opp.sector === 'drones')) {
        matchScore += 1;
      }
      
      return { ...opp, matchScore };
    });

    return scoredOpportunities
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }
} 