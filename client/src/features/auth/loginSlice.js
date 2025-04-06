import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Define initial state
const initialState = {


  loading: false,
  error: null,
  message:null

};

// Async thunk to handle login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/v1/auth/login`, { email, password, role }, { withCredentials: true });
      console.log(response.data);
      // Store the role and user data
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




// Slice to handle authentication state
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

    resetLoginState: (state) => {
      state.error=null
      state.message=null
    }
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
        state.message=action.payload.message


      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.message=null
      })


  },
});

// Export actions
export const { resetLoginState } = loginSlice.actions;

// Export reducer
export default loginSlice.reducer;

