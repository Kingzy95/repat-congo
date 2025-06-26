import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Habit, HabitStats } from '../../types';
import apiService from '../../services/api';

interface HabitsState {
  habits: Habit[];
  stats: HabitStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: HabitsState = {
  habits: [],
  stats: null,
  loading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
  return await apiService.getHabits();
});

export const initializeDefaultHabits = createAsyncThunk('habits/initializeDefault', async () => {
  return await apiService.initializeDefaultHabits();
});

export const fetchHabitStats = createAsyncThunk('habits/fetchStats', async () => {
  return await apiService.getHabitStats();
});

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.habits = action.payload;
      })
      .addCase(initializeDefaultHabits.fulfilled, (state, action) => {
        state.habits = action.payload;
      })
      .addCase(fetchHabitStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default habitsSlice.reducer; 