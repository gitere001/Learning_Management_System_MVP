import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  role:null,
  user:null
};

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/v1/auth/refresh-token`, {}, { withCredentials: true });
	  console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
	setIsAuthenicated: (state) => {state.isAuthenticated=true},
	setNotAuthenicated: state => {state.isAuthenticated=false},
  setRole: (state, action) => {state.role=action.payload},
  unsetRole: state => {state.role=null}
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.role=action.payload.role
        state.user=action.payload.user

      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error during token refresh';
        state.isAuthenticated = false;
        state.role=null
      });
  },
});

export const { setIsAuthenicated, setNotAuthenicated, setRole, unsetRole } = authSlice.actions;

export default authSlice.reducer;
