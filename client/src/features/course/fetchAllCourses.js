import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk to fetch all courses
export const fetchAllCourses = createAsyncThunk(
  'courses/fetchAllCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/v1/courses/admin/all-courses`, {
        withCredentials: true,
      });

      return response.data.data; // assuming success = true and data is the array
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const allCoursesSlice = createSlice({
  name: 'allCourses',
  initialState: {
    loading: false,
    error: null,
    courses: [],
  },
  reducers: {
    resetAllCoursesState: (state) => {
      state.loading = false;
      state.error = null;
      state.courses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.courses = [];
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch courses';
      });
  },
});

export const { resetAllCoursesState } = allCoursesSlice.actions;
export default allCoursesSlice.reducer;
