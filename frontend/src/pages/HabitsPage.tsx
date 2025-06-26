import React, { useState } from 'react';

const HabitsPage: React.FC = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: '💪 Sport (1h)',
      description: 'Session sport quotidienne pour maintenir la forme',
      streak: 5,
      completed: false,
      target: '1 heure par jour'
    },
    {
      id: 2,
      name: '📚 Lecture tech (30min)',
      description: 'Lecture articles techniques et veille technologique',
      streak: 3,
      completed: false,
      target: '30 minutes par jour'
    },
    {
      id: 3,
      name: '🤝 Networking (5 contacts)',
      description: 'Développement réseau professionnel quotidien',
      streak: 2,
      completed: false,
      target: '5 nouveaux contacts par jour'
    },
    {
      id: 4,
      name: '🧠 Méditation (15min)',
      description: 'Méditation pour améliorer focus et gestion stress',
      streak: 7,
      completed: true,
      target: '15 minutes par jour'
    },
    {
      id: 5,
      name: '📝 Planification (20min)',
      description: 'Planification et revue des objectifs quotidiens',
      streak: 4,
      completed: false,
      target: '20 minutes le matin'
    }
  ]);

  const markHabitDone = (habitId: number) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak - 1 : habit.streak + 1 }
        : habit
    ));
  };

  const completedToday = habits.filter(habit => habit.completed).length;
  const averageStreak = Math.round(habits.reduce((acc, habit) => acc + habit.streak, 0) / habits.length);

  return (
    <section id="habits" className="content-section active">
      <div className="section-header">
        <h1>🎯 Suivi des Habitudes</h1>
        <p>Développez des habitudes durables pour votre succès entrepreneurial</p>
      </div>

      <div className="card">
        <h3>📊 Statistiques Habitudes</h3>
        <div className="kpi-grid" style={{ marginTop: '16px' }}>
          <div className="kpi-item">
            <div className="kpi-value">{completedToday}</div>
            <div className="kpi-label">Complétées aujourd'hui</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-value">{habits.length}</div>
            <div className="kpi-label">Habitudes totales</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-value">{averageStreak}</div>
            <div className="kpi-label">Série moyenne</div>
          </div>
        </div>
      </div>

      <div className="card habits-card" style={{ marginTop: '24px' }}>
        <h3>📝 Liste des Habitudes</h3>
        <div className="habits-list">
          {habits.map((habit) => (
            <div key={habit.id} className="habit-item">
              <div style={{ flex: 1 }}>
                <span className="habit-name">{habit.name}</span>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0' }}>
                  {habit.description}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Objectif: {habit.target}
                </p>
              </div>
              <div className="habit-tracker">
                <span className="habit-streak">Série: {habit.streak} jours</span>
                <button 
                  className={`btn btn--sm ${habit.completed ? 'btn--secondary' : 'btn--primary'} mark-done`}
                  onClick={() => markHabitDone(habit.id)}
                >
                  {habit.completed ? '✓ Fait' : '✓'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3>🏆 Récompenses & Motivation</h3>
        <div style={{ marginTop: '16px' }}>
          <div className="recommendation">
            <strong>🔥 Série de feu !</strong> Vous maintenez une moyenne de {averageStreak} jours de série. Continuez !
          </div>
          {completedToday === habits.length && (
            <div className="recommendation" style={{ marginTop: '8px' }}>
              <strong>🎉 Journée parfaite !</strong> Toutes vos habitudes sont complétées aujourd'hui !
            </div>
          )}
          <div className="recommendation" style={{ marginTop: '8px' }}>
            <strong>💡 Conseil :</strong> Les habitudes sont la clé du succès entrepreneurial. Restez constant !
          </div>
        </div>
      </div>
    </section>
  );
};

export default HabitsPage; 