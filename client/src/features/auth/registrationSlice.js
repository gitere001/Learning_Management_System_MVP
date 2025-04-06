import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk to register the user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/v1/auth/register`, userData);

      const { success, message } = response.data;

      if (!success) {
        // If registration fails (e.g., email already in use), return the error message
        return rejectWithValue(message);
      }

      return message; // "User registered successfully"
    } catch (error) {
      console.log(error);
      return rejectWithValue("Server error. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    message: '',
  },
  reducers: {
    clearRegistrationState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload; // "User registered successfully"
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Server or custom error message
        state.message = '';
      });
  },
});

export const { clearRegistrationState } = authSlice.actions;

export default authSlice.reducer;
