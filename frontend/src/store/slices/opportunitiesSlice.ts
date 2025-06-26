import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MarketOpportunity, OpportunityStats } from '../../types';
import apiService from '../../services/api';

interface OpportunitiesState {
  opportunities: MarketOpportunity[];
  stats: OpportunityStats | null;
  recommendations: MarketOpportunity[];
  loading: boolean;
  error: string | null;
}

const initialState: OpportunitiesState = {
  opportunities: [],
  stats: null,
  recommendations: [],
  loading: false,
  error: null,
};

export const fetchOpportunities = createAsyncThunk('opportunities/fetchOpportunities', async () => {
  return await apiService.getOpportunities();
});

export const initializeOpportunities = createAsyncThunk('opportunities/initialize', async () => {
  return await apiService.initializeOpportunities();
});

export const fetchOpportunityStats = createAsyncThunk('opportunities/fetchStats', async () => {
  return await apiService.getOpportunityStats();
});

export const fetchRecommendations = createAsyncThunk('opportunities/fetchRecommendations', async () => {
  return await apiService.getRecommendations({
    skills: ['drones', 'IA', 'tech'],
    experience: 'tech'
  });
});

const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpportunities.fulfilled, (state, action) => {
        state.opportunities = action.payload;
      })
      .addCase(initializeOpportunities.fulfilled, (state, action) => {
        state.opportunities = action.payload;
      })
      .addCase(fetchOpportunityStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload;
      });
  },
});

export default opportunitiesSlice.reducer; 