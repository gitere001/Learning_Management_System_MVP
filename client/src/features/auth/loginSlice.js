import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  user: null,
  role: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunk to handle login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', { email, password, role });
      // Store the role and user data
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to handle refresh token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/refresh', {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice to handle authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = false;
      })

      // Handling refresh token
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.role = action.payload.role;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const { logoutUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

