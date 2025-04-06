import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk to check email
export const checkEmail = createAsyncThunk(
  'email/checkEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/v1/auth/check-email`, { email });
      const { success, message } = response.data;

      if (!success) {
        // Map the server error message to a more specific error state
        if (message === "User already exists") {
          return rejectWithValue("Email already registered");
        }
        return rejectWithValue(message); // fallback to the server's message
      }

      return message; // "New user"
    } catch (error) {
      // Check if the error is an axios error
      if (error.response) {
        // Server responded with a status other than 2xx
        return rejectWithValue(error.response.data.message || "Something went wrong.");
      } else if (error.request) {
        // No response was received
        return rejectWithValue("No response from the server. Please try again.");
      } else {
        // Something happened while setting up the request
        return rejectWithValue("Something went wrong. Please try again.");
      }
    }
  }
);

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    loading: false,
    error: null,
    message: '',
  },
  reducers: {
    clearEmailState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = '';
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload; // "New user"
        state.error = null;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // The specific error returned from rejectWithValue
        state.message = '';
      });
  },
});

export const { clearEmailState } = emailSlice.actions;

export default emailSlice.reducer;
