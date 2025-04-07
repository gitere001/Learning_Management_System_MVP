import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk for creating a new course
export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async ({ courseData, thumbnailFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append all course data to formData
      Object.entries(courseData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append thumbnail file if it exists
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }

      const response = await axios.post(
        `${apiUrl}/v1/courses/add-new-course`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    loading: false,
    error: null,
    success: null,

  },
  reducers: {
    resetCourseState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.error=null
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create";
      });
  },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;