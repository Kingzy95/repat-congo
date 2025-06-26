import React, { useEffect, useState } from 'react';

const DashboardPage: React.FC = () => {
  const [countdown, setCountdown] = useState({
    days: 120,
    hours: 8,
    minutes: 30
  });

  useEffect(() => {
    // Simuler le countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000); // Mettre à jour chaque minute

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="dashboard" className="content-section active">
      <div className="section-header">
        <h1>Dashboard Principal</h1>
        <p>Vue d'ensemble de votre préparation Congo</p>
      </div>

      <div className="dashboard-grid">
        {/* Countdown */}
        <div className="card countdown-card">
          <h3>🚀 Départ dans</h3>
          <div className="countdown-display">
            <div className="countdown-item">
              <span id="days">{countdown.days}</span>
              <label>Jours</label>
            </div>
            <div className="countdown-item">
              <span id="hours">{countdown.hours}</span>
              <label>Heures</label>
            </div>
            <div className="countdown-item">
              <span id="minutes">{countdown.minutes}</span>
              <label>Minutes</label>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="card kpis-card">
          <h3>📈 Indicateurs Progression</h3>
          <div className="kpi-grid">
            <div className="kpi-item">
              <div className="kpi-value">75%</div>
              <div className="kpi-label">Préparation</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="kpi-item">
              <div className="kpi-value">12</div>
              <div className="kpi-label">Contacts établis</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-value">3/5</div>
              <div className="kpi-label">Prototypes</div>
            </div>
          </div>
        </div>

        {/* Tâches du jour */}
        <div className="card tasks-card">
          <h3>✅ Tâches Prioritaires Aujourd'hui</h3>
          <ul className="task-list">
            <li className="task-item">
              <input type="checkbox" id="task1" />
              <label htmlFor="task1">Finaliser business plan drones</label>
            </li>
            <li className="task-item">
              <input type="checkbox" id="task2" />
              <label htmlFor="task2">Contacter CARIA pour partenariat</label>
            </li>
            <li className="task-item">
              <input type="checkbox" id="task3" />
              <label htmlFor="task3">Étudier réglementation drone Congo</label>
            </li>
          </ul>
        </div>

        {/* Météo économique */}
        <div className="card weather-card">
          <h3>🌡️ Météo Économique Congo</h3>
          <div className="economic-weather">
            <div className="weather-main">
              <span className="weather-icon">📈</span>
              <span className="weather-status">Favorable</span>
            </div>
            <div className="weather-details">
              <div>Croissance PIB: +4.4%</div>
              <div>Pétrole: 85$/baril</div>
              <div>Taux change: Stable</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage; 