import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  isLoggedOut: false,
  loading: false,
  error: null,
  message: null
}

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {  // Note the underscore for unused params
    try {
      const response = await axios.post(
        `${apiUrl}/v1/auth/logout`,
        {},  // Empty body
        { withCredentials: true }  // Correct config position
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Logout failed" });
    }
  }
);

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    resetLogoutState: (state) => {
      state.error = null;
      state.message = null;
      state.isLoggedOut = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedOut = true;
        state.message = action.payload?.message || "Logout successful";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedOut = false;
        state.error = action.payload?.message || "Logout failed";
        state.message = null;
      });
  },
});

export const { resetLogoutState } = logoutSlice.actions;
export default logoutSlice.reducer;