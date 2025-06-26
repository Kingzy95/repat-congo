import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: '📊 Dashboard', section: 'dashboard' },
    { path: '/swot', label: '🎯 Analyse SWOT', section: 'swot' },
    { path: '/planning', label: '📅 Plan 4 Mois', section: 'planning' },
    { path: '/opportunities', label: '💡 Opportunités', section: 'opportunities' },
    { path: '/productivity', label: '⚡ Productivité', section: 'productivity' },
    { path: '/habits', label: '🎯 Habitudes', section: 'habits' },
    { path: '/goals', label: '🏆 Objectifs', section: 'goals' },
    { path: '/resources', label: '📚 Ressources Congo', section: 'resources' }
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>🇨🇬 Congo Entrepreneur</h2>
        <p>Votre assistant personnel</p>
      </div>
      <ul className="nav-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              data-section={item.section}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar; 