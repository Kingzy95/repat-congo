import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SwotAnalysis } from '../../types';
import apiService from '../../services/api';

interface SwotState {
  analysis: SwotAnalysis | null;
  loading: boolean;
  error: string | null;
}

const initialState: SwotState = {
  analysis: null,
  loading: false,
  error: null,
};

export const fetchSwotAnalysis = createAsyncThunk(
  'swot/fetchAnalysis',
  async () => {
    return await apiService.getSwotAnalysis();
  }
);

export const createSwotAnalysis = createAsyncThunk(
  'swot/createAnalysis',
  async () => {
    return await apiService.createSwotAnalysis();
  }
);

const swotSlice = createSlice({
  name: 'swot',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwotAnalysis.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSwotAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload;
        state.error = null;
      })
      .addCase(fetchSwotAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur SWOT';
      })
      .addCase(createSwotAnalysis.fulfilled, (state, action) => {
        state.analysis = action.payload;
      });
  },
});

export const { clearError } = swotSlice.actions;
export default swotSlice.reducer; 