import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PomodoroSession, PomodoroStats } from '../../types';
import apiService from '../../services/api';

interface PomodoroState {
  currentSession: PomodoroSession | null;
  stats: PomodoroStats | null;
  isActive: boolean;
  timeRemaining: number;
  loading: boolean;
  error: string | null;
}

const initialState: PomodoroState = {
  currentSession: null,
  stats: null,
  isActive: false,
  timeRemaining: 25 * 60, // 25 minutes par défaut
  loading: false,
  error: null,
};

export const startSession = createAsyncThunk('pomodoro/startSession', async (type: string = 'work') => {
  return await apiService.startPomodoroSession(type);
});

export const fetchPomodoroStats = createAsyncThunk('pomodoro/fetchStats', async () => {
  return await apiService.getPomodoroStats();
});

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSession.fulfilled, (state, action) => {
        state.currentSession = action.payload;
        state.isActive = true;
        state.timeRemaining = 25 * 60;
      })
      .addCase(fetchPomodoroStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const { setTimeRemaining, setIsActive } = pomodoroSlice.actions;
export default pomodoroSlice.reducer; 