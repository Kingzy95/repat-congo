import React, { useState } from 'react';

const GoalsPage: React.FC = () => {
  const [goals] = useState([
    {
      id: 1,
      title: 'Finaliser prototype drone agriculture',
      progress: 60,
      deadline: '15 juillet 2024',
      description: 'Développer un prototype fonctionnel pour surveillance agricole'
    },
    {
      id: 2,
      title: 'Établir 50 contacts professionnels Congo',
      progress: 32,
      deadline: '30 août 2024',
      description: '16/50 contacts établis avec des entrepreneurs locaux'
    },
    {
      id: 3,
      title: 'Lever 25M FCFA financement initial',
      progress: 20,
      deadline: '30 septembre 2024',
      description: '5M/25M FCFA sécurisés via investisseurs'
    },
    {
      id: 4,
      title: 'Obtenir 5 clients pilotes',
      progress: 40,
      deadline: '15 octobre 2024',
      description: '2/5 clients pilotes confirmés pour tests'
    },
    {
      id: 5,
      title: 'Créer centre formation drones',
      progress: 10,
      deadline: '31 décembre 2024',
      description: 'Établir un centre de formation certifié au Congo'
    }
  ]);

  return (
    <section id="goals" className="content-section active">
      <div className="section-header">
        <h1>🏆 Objectifs SMART</h1>
        <p>Suivez votre progression vers vos objectifs entrepreneurs</p>
      </div>

      <div className="smart-goals-card card">
        <h3>🎯 Objectifs Stratégiques Congo</h3>
        <div className="smart-goals-list">
          {goals.map((goal) => (
            <div key={goal.id} className="smart-goal">
              <h4>{goal.title}</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                {goal.description}
              </p>
              <div className="goal-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${goal.progress}%` }}></div>
                </div>
                <span>{goal.progress}% - Échéance: {goal.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3>📊 Résumé Progression</h3>
        <div className="kpi-grid" style={{ marginTop: '16px' }}>
          <div className="kpi-item">
            <div className="kpi-value">{Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%</div>
            <div className="kpi-label">Progression moyenne</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-value">{goals.filter(goal => goal.progress >= 50).length}</div>
            <div className="kpi-label">Objectifs &gt; 50%</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-value">{goals.filter(goal => goal.progress >= 100).length}</div>
            <div className="kpi-label">Objectifs complétés</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsPage; 