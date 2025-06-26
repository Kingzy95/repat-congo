import React, { useState } from 'react';

const PlanningPage: React.FC = () => {
  const [monthProgress, setMonthProgress] = useState({
    month1: 40,
    month2: 20,
    month3: 0,
    month4: 0
  });

  const toggleTask = (monthId: string, taskId: string) => {
    // Logique pour cocher/décocher les tâches
    console.log(`Toggle task ${taskId} in ${monthId}`);
  };

  return (
    <section id="planning" className="content-section active">
      <div className="section-header">
        <h1>Planificateur 4 Mois</h1>
        <p>Organisez votre préparation par étapes</p>
      </div>

      <div className="planning-timeline">
        <div className="timeline-month">
          <h3>Mois 1 - Analyse & Préparation</h3>
          <div className="month-tasks">
            <div className="task-category">
              <h4>📋 Personnel</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month1', 'personal1')} /> Analyse SWOT personnelle
              </label>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month1', 'personal2')} /> Formation leadership
              </label>
            </div>
            <div className="task-category">
              <h4>💼 Professionnel</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month1', 'pro1')} /> Étude marché drones
              </label>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month1', 'pro2')} /> Contact CARIA
              </label>
            </div>
            <div className="task-category">
              <h4>📄 Administratif</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month1', 'admin1')} /> Procédures création entreprise
              </label>
            </div>
          </div>
          <div className="month-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${monthProgress.month1}%` }}></div>
            </div>
            <span>{monthProgress.month1}% complété</span>
          </div>
        </div>

        <div className="timeline-month">
          <h3>Mois 2 - Développement</h3>
          <div className="month-tasks">
            <div className="task-category">
              <h4>🔧 Technique</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month2', 'tech1')} /> Prototype drone agriculture
              </label>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month2', 'tech2')} /> MVP conseil SI
              </label>
            </div>
            <div className="task-category">
              <h4>🤝 Relations</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month2', 'rel1')} /> Contact clients potentiels
              </label>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month2', 'rel2')} /> Formation interculturelle
              </label>
            </div>
            <div className="task-category">
              <h4>📋 Stratégie</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month2', 'strat1')} /> Business model canvas
              </label>
            </div>
          </div>
          <div className="month-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${monthProgress.month2}%` }}></div>
            </div>
            <span>{monthProgress.month2}% complété</span>
          </div>
        </div>

        <div className="timeline-month">
          <h3>Mois 3 - Finalisation</h3>
          <div className="month-tasks">
            <div className="task-category">
              <h4>📊 Business</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month3', 'bus1')} /> Business plan complet
              </label>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month3', 'bus2')} /> Formation vente
              </label>
            </div>
            <div className="task-category">
              <h4>🤝 Partenariats</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month3', 'part1')} /> Partenariats équipementiers
              </label>
            </div>
            <div className="task-category">
              <h4>🏠 Logistique</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month3', 'log1')} /> Contrats location
              </label>
            </div>
          </div>
          <div className="month-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${monthProgress.month3}%` }}></div>
            </div>
            <span>{monthProgress.month3}% complété</span>
          </div>
        </div>

        <div className="timeline-month">
          <h3>Mois 4 - Lancement</h3>
          <div className="month-tasks">
            <div className="task-category">
              <h4>🧪 Tests</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month4', 'test1')} /> Tests solutions
              </label>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month4', 'test2')} /> Installation équipements
              </label>
            </div>
            <div className="task-category">
              <h4>💰 Finances</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month4', 'fin1')} /> Transfert fonds
              </label>
            </div>
            <div className="task-category">
              <h4>🚀 Lancement</h4>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month4', 'launch1')} /> Lancement activités
              </label>
              <label className="task-checkbox">
                <input type="checkbox" onChange={() => toggleTask('month4', 'launch2')} /> Campagne communication
              </label>
            </div>
          </div>
          <div className="month-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${monthProgress.month4}%` }}></div>
            </div>
            <span>{monthProgress.month4}% complété</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanningPage; 