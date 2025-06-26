import React, { useState } from 'react';

const SwotPage: React.FC = () => {
  const [swotData, setSwotData] = useState({
    forces: [
      'Diplôme Epitech Architecture Logiciel',
      'Spécialisation Data & IA',
      'Vision entrepreneuriale claire',
      'Connaissance technologies modernes'
    ],
    faiblesses: [
      'Manque expérience terrain Congo',
      'Absence réseau professionnel local',
      'Méconnaissance spécificités culturelles',
      'Capital départ potentiellement limité'
    ],
    opportunites: [
      'Économie croissance 4,4% 2025',
      'Secteur pétrolier cherchant innovation',
      'Marché drones expansion Afrique',
      'CARIA Centre IA Brazzaville'
    ],
    menaces: [
      'Écosystème entrepreneurial peu mature',
      'Difficultés accès financement',
      'Réglementation drone restrictive',
      'Concurrence internationale tech'
    ]
  });

  const addItem = (category: keyof typeof swotData) => {
    const newItem = prompt(`Ajouter un élément aux ${category}:`);
    if (newItem && newItem.trim()) {
      setSwotData(prev => ({
        ...prev,
        [category]: [...prev[category], newItem.trim()]
      }));
    }
  };

  return (
    <section id="swot" className="content-section active">
      <div className="section-header">
        <h1>Analyse SWOT Personnelle</h1>
        <p>Identifiez vos forces, faiblesses, opportunités et menaces</p>
      </div>

      <div className="swot-grid">
        <div className="swot-quadrant forces">
          <h3>💪 Forces</h3>
          <div className="swot-content" id="forces-content">
            {swotData.forces.map((item, index) => (
              <div key={index} className="swot-item">{item}</div>
            ))}
          </div>
          <button 
            className="btn btn--secondary add-item-btn" 
            onClick={() => addItem('forces')}
          >
            + Ajouter
          </button>
        </div>

        <div className="swot-quadrant faiblesses">
          <h3>⚠️ Faiblesses</h3>
          <div className="swot-content" id="faiblesses-content">
            {swotData.faiblesses.map((item, index) => (
              <div key={index} className="swot-item">{item}</div>
            ))}
          </div>
          <button 
            className="btn btn--secondary add-item-btn" 
            onClick={() => addItem('faiblesses')}
          >
            + Ajouter
          </button>
        </div>

        <div className="swot-quadrant opportunites">
          <h3>🌟 Opportunités</h3>
          <div className="swot-content" id="opportunites-content">
            {swotData.opportunites.map((item, index) => (
              <div key={index} className="swot-item">{item}</div>
            ))}
          </div>
          <button 
            className="btn btn--secondary add-item-btn" 
            onClick={() => addItem('opportunites')}
          >
            + Ajouter
          </button>
        </div>

        <div className="swot-quadrant menaces">
          <h3>⚡ Menaces</h3>
          <div className="swot-content" id="menaces-content">
            {swotData.menaces.map((item, index) => (
              <div key={index} className="swot-item">{item}</div>
            ))}
          </div>
          <button 
            className="btn btn--secondary add-item-btn" 
            onClick={() => addItem('menaces')}
          >
            + Ajouter
          </button>
        </div>
      </div>

      <div className="swot-recommendations card">
        <h3>🎯 Recommandations Automatiques</h3>
        <div id="recommendations-list">
          <div className="recommendation">Exploiter votre expertise IA pour différencier vos services drones</div>
          <div className="recommendation">Développer un réseau local avant l'installation</div>
          <div className="recommendation">Étudier les spécificités culturelles congolaises</div>
        </div>
      </div>
    </section>
  );
};

export default SwotPage; 