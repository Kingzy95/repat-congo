import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SwotPage from './pages/SwotPage';
import PlanningPage from './pages/PlanningPage';
import GoalsPage from './pages/GoalsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import ProductivityPage from './pages/ProductivityPage';
import HabitsPage from './pages/HabitsPage';
import ResourcesPage from './pages/ResourcesPage';
import PrivateRoute from './components/PrivateRoute';
import './styles/index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="swot" element={<SwotPage />} />
              <Route path="planning" element={<PlanningPage />} />
              <Route path="goals" element={<GoalsPage />} />
              <Route path="opportunities" element={<OpportunitiesPage />} />
              <Route path="productivity" element={<ProductivityPage />} />
              <Route path="habits" element={<HabitsPage />} />
              <Route path="resources" element={<ResourcesPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App; 