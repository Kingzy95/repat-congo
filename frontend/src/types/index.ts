// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Types pour SWOT
export interface SwotItem {
  id: string;
  category: 'forces' | 'faiblesses' | 'opportunites' | 'menaces';
  content: string;
}

export interface SwotAnalysis {
  id: string;
  userId: string;
  forces: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: string[];
  createdAt: string;
  updatedAt: string;
}

// Types pour les tâches
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  category?: string;
  section?: string;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
  highPriority: number;
  overdue: number;
  planningProgress: {
    [section: string]: {
      total: number;
      completed: number;
    };
  };
}

// Types pour les objectifs
export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  progress: number;
  target: number;
  unit: string;
  deadline?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  completionRate: number;
  averageProgress: number;
  upcomingDeadlines: Array<{
    id: string;
    title: string;
    deadline: string;
    progress: number;
    target: number;
    unit: string;
  }>;
}

// Types pour les habitudes
export interface Habit {
  id: string;
  userId: string;
  name: string;
  targetFrequency: number;
  currentStreak: number;
  bestStreak: number;
  completedToday: boolean;
  totalCompletions: number;
  createdAt: string;
  updatedAt: string;
}

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  averageStreak: number;
  bestStreakOverall: number;
  weeklyCompletion: number;
  habits: Array<{
    name: string;
    currentStreak: number;
    completedToday: boolean;
  }>;
}

// Types pour Pomodoro
export interface PomodoroSession {
  id: string;
  userId: string;
  duration: number;
  type: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PomodoroStats {
  totalSessions: number;
  totalMinutes: number;
  todaySessions: number;
  todayMinutes: number;
  weekSessions: number;
  weekMinutes: number;
  averageSessionsPerDay: number;
}

// Types pour les opportunités
export interface MarketOpportunity {
  id: string;
  sector: string;
  category: string;
  title: string;
  description?: string;
  potential: string;
  competition: string;
  roi: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  matchScore?: number;
}

export interface OpportunityStats {
  total: number;
  sectors: {
    [sector: string]: {
      count: number;
      averageScore: number;
      totalScore: number;
    };
  };
  averageScore: number;
  topOpportunities: Array<{
    id: string;
    title: string;
    sector: string;
    score: number;
    potential: string;
  }>;
}

// Types pour la navigation
export type Section = 
  | 'dashboard' 
  | 'swot' 
  | 'planning' 
  | 'goals'
  | 'opportunities' 
  | 'productivity' 
  | 'habits'
  | 'resources';

// Types pour les KPIs du dashboard
export interface DashboardKPIs {
  preparationPercentage: number;
  contactsEstablished: number;
  prototypesCompleted: number;
  daysRemaining: number;
  economicWeather: {
    status: 'Favorable' | 'Stable' | 'Incertain' | 'Défavorable';
    gdpGrowth: string;
    oilPrice: string;
    exchangeRate: string;
  };
}

// Types pour les erreurs API
export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
} 