import axios, { AxiosInstance, AxiosError } from 'axios';
import { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData,
  SwotAnalysis,
  Task,
  TaskStats,
  Goal,
  GoalStats,
  Habit,
  HabitStats,
  PomodoroSession,
  PomodoroStats,
  MarketOpportunity,
  OpportunityStats,
  ApiError
} from '../types';

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
    });

    // Intercepteur pour ajouter le token
    this.api.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Intercepteur pour gérer les erreurs
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );

    // Charger le token depuis localStorage
    this.loadToken();
  }

  private loadToken() {
    const savedToken = localStorage.getItem('access_token');
    if (savedToken) {
      this.token = savedToken;
    }
  }

  private saveToken(token: string) {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  private removeToken() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  // Auth
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', credentials);
    this.saveToken(response.data.access_token);
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', data);
    this.saveToken(response.data.access_token);
    return response.data;
  }

  async logout() {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  // SWOT
  async getSwotAnalysis(): Promise<SwotAnalysis> {
    const response = await this.api.get<SwotAnalysis>('/swot');
    return response.data;
  }

  async createSwotAnalysis(): Promise<SwotAnalysis> {
    const response = await this.api.post<SwotAnalysis>('/swot/initialize');
    return response.data;
  }

  async addSwotItem(category: string, content: string): Promise<SwotAnalysis> {
    const response = await this.api.post<SwotAnalysis>(`/swot/${category}`, { content });
    return response.data;
  }

  async removeSwotItem(category: string, content: string): Promise<SwotAnalysis> {
    const response = await this.api.delete<SwotAnalysis>(`/swot/${category}`, { 
      data: { content } 
    });
    return response.data;
  }

  async getSwotRecommendations(): Promise<string[]> {
    const response = await this.api.get<{ recommendations: string[] }>('/swot/recommendations');
    return response.data.recommendations;
  }

  // Tasks
  async getTasks(filters?: {
    category?: string;
    section?: string;
    completed?: boolean;
    priority?: string;
  }): Promise<Task[]> {
    const response = await this.api.get<Task[]>('/tasks', { params: filters });
    return response.data;
  }

  async createTask(task: {
    title: string;
    description?: string;
    category?: string;
    section?: string;
    priority?: string;
    dueDate?: string;
  }): Promise<Task> {
    const response = await this.api.post<Task>('/tasks', task);
    return response.data;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await this.api.patch<Task>(`/tasks/${id}`, updates);
    return response.data;
  }

  async deleteTask(id: string): Promise<Task> {
    const response = await this.api.delete<Task>(`/tasks/${id}`);
    return response.data;
  }

  async toggleTask(id: string): Promise<Task> {
    const response = await this.api.post<Task>(`/tasks/${id}/toggle`);
    return response.data;
  }

  async initializePlanningTasks(): Promise<Task[]> {
    const response = await this.api.post<Task[]>('/tasks/initialize-planning');
    return response.data;
  }

  async getTaskStats(): Promise<TaskStats> {
    const response = await this.api.get<TaskStats>('/tasks/stats');
    return response.data;
  }

  // Goals
  async getGoals(category?: string): Promise<Goal[]> {
    const response = await this.api.get<Goal[]>('/goals', { 
      params: category ? { category } : {} 
    });
    return response.data;
  }

  async createGoal(goal: {
    title: string;
    description?: string;
    target?: number;
    unit?: string;
    deadline?: string;
    category?: string;
  }): Promise<Goal> {
    const response = await this.api.post<Goal>('/goals', goal);
    return response.data;
  }

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal> {
    const response = await this.api.patch<Goal>(`/goals/${id}`, updates);
    return response.data;
  }

  async updateGoalProgress(id: string, progress: number): Promise<Goal> {
    const response = await this.api.post<Goal>(`/goals/${id}/progress`, { progress });
    return response.data;
  }

  async deleteGoal(id: string): Promise<Goal> {
    const response = await this.api.delete<Goal>(`/goals/${id}`);
    return response.data;
  }

  async initializeSMARTGoals(): Promise<Goal[]> {
    const response = await this.api.post<Goal[]>('/goals/initialize-smart');
    return response.data;
  }

  async getGoalStats(): Promise<GoalStats> {
    const response = await this.api.get<GoalStats>('/goals/stats');
    return response.data;
  }

  // Habits
  async getHabits(): Promise<Habit[]> {
    const response = await this.api.get<Habit[]>('/habits');
    return response.data;
  }

  async createHabit(habit: { name: string; targetFrequency: number }): Promise<Habit> {
    const response = await this.api.post<Habit>('/habits', habit);
    return response.data;
  }

  async completeHabit(id: string): Promise<Habit> {
    const response = await this.api.post<Habit>(`/habits/${id}/complete`);
    return response.data;
  }

  async initializeDefaultHabits(): Promise<Habit[]> {
    const response = await this.api.post<Habit[]>('/habits/initialize');
    return response.data;
  }

  async getHabitStats(): Promise<HabitStats> {
    const response = await this.api.get<HabitStats>('/habits/stats');
    return response.data;
  }

  // Pomodoro
  async startPomodoroSession(type: string = 'work'): Promise<PomodoroSession> {
    const response = await this.api.post<PomodoroSession>('/pomodoro/start', { type });
    return response.data;
  }

  async completePomodoroSession(sessionId: string, duration: number): Promise<PomodoroSession> {
    const response = await this.api.post<PomodoroSession>(`/pomodoro/${sessionId}/complete`, { duration });
    return response.data;
  }

  async getPomodoroStats(): Promise<PomodoroStats> {
    const response = await this.api.get<PomodoroStats>('/pomodoro/stats');
    return response.data;
  }

  // Opportunities
  async getOpportunities(sector?: string): Promise<MarketOpportunity[]> {
    const response = await this.api.get<MarketOpportunity[]>('/opportunities', {
      params: sector ? { sector } : {}
    });
    return response.data;
  }

  async initializeOpportunities(): Promise<MarketOpportunity[]> {
    const response = await this.api.post<MarketOpportunity[]>('/opportunities/initialize');
    return response.data;
  }

  async getOpportunityStats(): Promise<OpportunityStats> {
    const response = await this.api.get<OpportunityStats>('/opportunities/stats');
    return response.data;
  }

  async getRecommendations(userProfile?: {
    skills?: string[];
    interests?: string[];
    experience?: string;
  }): Promise<MarketOpportunity[]> {
    const response = await this.api.post<MarketOpportunity[]>('/opportunities/recommendations', userProfile);
    return response.data;
  }

  async searchOpportunities(query: string): Promise<MarketOpportunity[]> {
    const response = await this.api.get<MarketOpportunity[]>(`/opportunities/search/${query}`);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService; 