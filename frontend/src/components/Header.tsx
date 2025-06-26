import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/slices/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-left">
          <h2>🇨🇬 Entrepreneur Congo</h2>
          <span className="header-subtitle">Planificateur Personnel</span>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <span className="user-welcome">Bonjour, <strong>{user?.email || 'Entrepreneur'}</strong></span>
            <div className="user-actions">
              <button 
                className="btn btn--outline btn--sm logout-btn"
                onClick={handleLogout}
                title="Se déconnecter"
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 