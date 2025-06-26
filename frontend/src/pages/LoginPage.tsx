import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { login, register, clearError } from '../store/slices/authSlice';
import { LoginCredentials, RegisterData } from '../types';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginCredentials & RegisterData>();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginCredentials & RegisterData) => {
    try {
      if (isRegistering) {
        await dispatch(register({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        })).unwrap();
        toast.success('Inscription réussie ! Bienvenue !');
      } else {
        await dispatch(login({
          email: data.email,
          password: data.password,
        })).unwrap();
        toast.success('Connexion réussie !');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erreur d\'authentification');
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    reset();
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🇨🇬</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Congo Entrepreneur
          </h1>
          <p className="text-gray-600">
            {isRegistering ? 'Créez votre compte' : 'Connectez-vous à votre compte'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegistering && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  {...registerForm('firstName', { 
                    required: isRegistering ? 'Prénom requis' : false 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Votre prénom"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  {...registerForm('lastName', { 
                    required: isRegistering ? 'Nom requis' : false 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Votre nom"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...registerForm('email', { 
                required: 'Email requis',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email invalide'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              {...registerForm('password', { 
                required: 'Mot de passe requis',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 caractères'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {isRegistering ? 'Inscription...' : 'Connexion...'}
              </div>
            ) : (
              isRegistering ? 'S\'inscrire' : 'Se connecter'
            )}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-green-600 hover:text-green-800 font-medium"
          >
            {isRegistering 
              ? 'Déjà un compte ? Se connecter' 
              : 'Pas de compte ? S\'inscrire'
            }
          </button>
        </div>

        {/* Demo info */}
        <div className="mt-6 p-3 bg-green-50 rounded-lg text-center">
          <p className="text-xs text-green-700">
            🚀 Préparez votre aventure entrepreneuriale au Congo-Brazzaville
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 