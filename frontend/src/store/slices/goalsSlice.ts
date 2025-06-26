import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Goal, GoalStats } from '../../types';
import apiService from '../../services/api';

interface GoalsState {
  goals: Goal[];
  stats: GoalStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  stats: null,
  loading: false,
  error: null,
};

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  return await apiService.getGoals();
});

export const initializeSMARTGoals = createAsyncThunk('goals/initializeSMART', async () => {
  return await apiService.initializeSMARTGoals();
});

export const fetchGoalStats = createAsyncThunk('goals/fetchStats', async () => {
  return await apiService.getGoalStats();
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
      })
      .addCase(initializeSMARTGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
      })
      .addCase(fetchGoalStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default goalsSlice.reducer; 