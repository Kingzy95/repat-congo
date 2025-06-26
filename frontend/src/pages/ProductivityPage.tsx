import React, { useState, useEffect } from 'react';

const ProductivityPage: React.FC = () => {
  const [timer, setTimer] = useState({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    status: 'Prêt à commencer'
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            return { ...prev, isRunning: false, status: 'Session terminée!' };
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isRunning]);

  const startTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: true, status: 'Session en cours...' }));
  };

  const pauseTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: false, status: 'En pause' }));
  };

  const resetTimer = () => {
    setTimer({
      minutes: 25,
      seconds: 0,
      isRunning: false,
      status: 'Prêt à commencer'
    });
  };

  const markHabitDone = (habitName: string) => {
    console.log(`Habit ${habitName} marked as done`);
    // Logique pour marquer l'habitude comme complétée
  };

  return (
    <section id="productivity" className="content-section active">
      <div className="section-header">
        <h1>Outils Productivité</h1>
        <p>Optimisez votre temps et suivez vos habitudes</p>
      </div>

      <div className="productivity-grid">
        {/* Pomodoro Timer */}
        <div className="card pomodoro-card">
          <h3>🍅 Timer Pomodoro</h3>
          <div className="pomodoro-timer">
            <div className="timer-display">
              <span id="timer-minutes">{timer.minutes.toString().padStart(2, '0')}</span>:
              <span id="timer-seconds">{timer.seconds.toString().padStart(2, '0')}</span>
            </div>
            <div className="timer-controls">
              <button className="btn btn--primary" onClick={startTimer} disabled={timer.isRunning}>
                Démarrer
              </button>
              <button className="btn btn--secondary" onClick={pauseTimer} disabled={!timer.isRunning}>
                Pause
              </button>
              <button className="btn btn--outline" onClick={resetTimer}>
                Reset
              </button>
            </div>
            <div className="timer-status">
              <span id="timer-status">{timer.status}</span>
            </div>
          </div>
        </div>

        {/* Habitudes */}
        <div className="card habits-card">
          <h3>🎯 Suivi des Habitudes</h3>
          <div className="habits-list">
            <div className="habit-item">
              <span className="habit-name">💪 Sport (1h)</span>
              <div className="habit-tracker">
                <span className="habit-streak">Série: 5 jours</span>
                <button className="btn btn--sm btn--primary mark-done" onClick={() => markHabitDone('sport')}>
                  ✓
                </button>
              </div>
            </div>
            <div className="habit-item">
              <span className="habit-name">📚 Lecture tech (30min)</span>
              <div className="habit-tracker">
                <span className="habit-streak">Série: 3 jours</span>
                <button className="btn btn--sm btn--primary mark-done" onClick={() => markHabitDone('lecture')}>
                  ✓
                </button>
              </div>
            </div>
            <div className="habit-item">
              <span className="habit-name">🤝 Networking (5 contacts)</span>
              <div className="habit-tracker">
                <span className="habit-streak">Série: 2 jours</span>
                <button className="btn btn--sm btn--primary mark-done" onClick={() => markHabitDone('networking')}>
                  ✓
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Objectifs SMART */}
        <div className="card smart-goals-card">
          <h3>🎯 Objectifs SMART</h3>
          <div className="smart-goals-list">
            <div className="smart-goal">
              <h4>Finaliser prototype drone agriculture</h4>
              <div className="goal-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '60%' }}></div>
                </div>
                <span>60% - Échéance: 15 juillet</span>
              </div>
            </div>
            <div className="smart-goal">
              <h4>Établir 20 contacts professionnels Congo</h4>
              <div className="goal-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '40%' }}></div>
                </div>
                <span>8/20 contacts - Échéance: 30 août</span>
              </div>
            </div>
            <div className="smart-goal">
              <h4>Lever 50M FCFA financement initial</h4>
              <div className="goal-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '20%' }}></div>
                </div>
                <span>10M/50M FCFA - Échéance: 30 septembre</span>
              </div>
            </div>
          </div>
        </div>

        {/* Planning Hebdomadaire */}
        <div className="card weekly-planning-card">
          <h3>📅 Planning Hebdomadaire</h3>
          <div className="weekly-view">
            <div className="week-day">
              <h5>Lundi</h5>
              <div className="day-tasks">
                <div className="time-slot">09:00 - Développement prototype</div>
                <div className="time-slot">14:00 - Recherche partenaires</div>
                <div className="time-slot">18:00 - Sport</div>
              </div>
            </div>
            <div className="week-day">
              <h5>Mardi</h5>
              <div className="day-tasks">
                <div className="time-slot">09:00 - Appels clients</div>
                <div className="time-slot">15:00 - Formation interculturelle</div>
              </div>
            </div>
            <div className="week-day">
              <h5>Mercredi</h5>
              <div className="day-tasks">
                <div className="time-slot">10:00 - Business plan</div>
                <div className="time-slot">16:00 - Networking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductivityPage; 