import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TaskStats } from '../../types';
import apiService from '../../services/api';

interface TasksState {
  tasks: Task[];
  stats: TaskStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  stats: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (filters?: {
    category?: string;
    section?: string;
    completed?: boolean;
    priority?: string;
  }) => {
    return await apiService.getTasks(filters);
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: {
    title: string;
    description?: string;
    category?: string;
    section?: string;
    priority?: string;
    dueDate?: string;
  }) => {
    return await apiService.createTask(taskData);
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    return await apiService.updateTask(id, updates);
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await apiService.deleteTask(id);
    return id;
  }
);

export const toggleTask = createAsyncThunk(
  'tasks/toggleTask',
  async (id: string) => {
    return await apiService.toggleTask(id);
  }
);

export const initializePlanningTasks = createAsyncThunk(
  'tasks/initializePlanning',
  async () => {
    return await apiService.initializePlanningTasks();
  }
);

export const fetchTaskStats = createAsyncThunk(
  'tasks/fetchStats',
  async () => {
    return await apiService.getTaskStats();
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement des tâches';
      })
      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      // Toggle task
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Initialize planning
      .addCase(initializePlanningTasks.fulfilled, (state, action) => {
        // Merge with existing tasks, avoiding duplicates
        const existingIds = state.tasks.map(t => t.id);
        const newTasks = action.payload.filter(t => !existingIds.includes(t.id));
        state.tasks.push(...newTasks);
      })
      // Fetch stats
      .addCase(fetchTaskStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const { clearError } = tasksSlice.actions;
export default tasksSlice.reducer; 