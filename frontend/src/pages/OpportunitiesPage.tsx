import React, { useState } from 'react';

const OpportunitiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('drones');

  const dronesOpportunities = [
    {
      title: '🛢️ Pétrole & Gaz',
      potential: '2B-5B FCFA',
      competition: 'Très faible',
      roi: '6-12 mois',
      score: 9
    },
    {
      title: '🌾 Agriculture',
      potential: '500M-1B FCFA',
      competition: 'Faible',
      roi: '12-18 mois',
      score: 7
    },
    {
      title: '⛏️ Mines',
      potential: '300M-800M FCFA',
      competition: 'Faible',
      roi: '12-24 mois',
      score: 6
    },
    {
      title: '🏗️ BTP',
      potential: '200M-500M FCFA',
      competition: 'Moyenne',
      roi: '18-24 mois',
      score: 5
    }
  ];

  const siOpportunities = [
    {
      title: '🏛️ Digitalisation Admin',
      potential: '1B-2B FCFA',
      complexity: 'Élevée',
      development: '6-12 mois',
      score: 8
    },
    {
      title: '🛢️ Systèmes Pétroliers',
      potential: '800M-1.5B FCFA',
      complexity: 'Très élevée',
      development: '12-18 mois',
      score: 7
    },
    {
      title: '🏦 Solutions Bancaires',
      potential: '600M-1.2B FCFA',
      complexity: 'Élevée',
      development: '8-15 mois',
      score: 6
    },
    {
      title: '📊 ERP Entreprises',
      potential: '400M-800M FCFA',
      complexity: 'Moyenne',
      development: '4-8 mois',
      score: 7
    }
  ];

  return (
    <section id="opportunities" className="content-section active">
      <div className="section-header">
        <h1>Analyse des Opportunités</h1>
        <p>Évaluez et comparez les potentiels de marché</p>
      </div>

      <div className="opportunities-tabs">
        <button 
          className={`tab-btn ${activeTab === 'drones' ? 'active' : ''}`}
          onClick={() => setActiveTab('drones')}
          data-tab="drones"
        >
          🚁 Drones
        </button>
        <button 
          className={`tab-btn ${activeTab === 'si' ? 'active' : ''}`}
          onClick={() => setActiveTab('si')}
          data-tab="si"
        >
          💻 Conseil SI
        </button>
        <button 
          className={`tab-btn ${activeTab === 'market-chart' ? 'active' : ''}`}
          onClick={() => setActiveTab('market-chart')}
          data-tab="market-chart"
        >
          📊 Graphique Marché
        </button>
      </div>

      <div className={`tab-content ${activeTab === 'drones' ? 'active' : ''}`} id="drones-tab">
        <div className="opportunities-grid">
          {dronesOpportunities.map((opportunity, index) => (
            <div key={index} className="opportunity-card">
              <h4>{opportunity.title}</h4>
              <div className="opportunity-stats">
                <div className="stat">
                  <span className="stat-value">{opportunity.potential}</span>
                  <span className="stat-label">Potentiel</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{opportunity.competition}</span>
                  <span className="stat-label">Concurrence</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{opportunity.roi}</span>
                  <span className="stat-label">ROI</span>
                </div>
              </div>
              <div className="opportunity-score">Score: {opportunity.score}/10</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'si' ? 'active' : ''}`} id="si-tab">
        <div className="opportunities-grid">
          {siOpportunities.map((opportunity, index) => (
            <div key={index} className="opportunity-card">
              <h4>{opportunity.title}</h4>
              <div className="opportunity-stats">
                <div className="stat">
                  <span className="stat-value">{opportunity.potential}</span>
                  <span className="stat-label">Potentiel</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{opportunity.complexity}</span>
                  <span className="stat-label">Complexité</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{opportunity.development}</span>
                  <span className="stat-label">Développement</span>
                </div>
              </div>
              <div className="opportunity-score">Score: {opportunity.score}/10</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'market-chart' ? 'active' : ''}`} id="market-chart-tab">
        <div className="chart-container">
          <h3>Comparaison des Opportunités de Marché</h3>
          <img 
            src="https://pplx-res.cloudinary.com/image/upload/v1749562573/pplx_code_interpreter/d48988d1_l7itvt.jpg" 
            alt="Opportunités de marché Congo" 
            className="market-chart" 
          />
          <p className="chart-description">
            Potentiel de marché estimé pour les différents secteurs d'activité au Congo Brazzaville (en millions de FCFA)
          </p>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesPage; 