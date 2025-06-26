import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import swotReducer from './slices/swotSlice';
import tasksReducer from './slices/tasksSlice';
import goalsReducer from './slices/goalsSlice';
import habitsReducer from './slices/habitsSlice';
import pomodoroReducer from './slices/pomodoroSlice';
import opportunitiesReducer from './slices/opportunitiesSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    swot: swotReducer,
    tasks: tasksReducer,
    goals: goalsReducer,
    habits: habitsReducer,
    pomodoro: pomodoroReducer,
    opportunities: opportunitiesReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 