import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk for updating a course
export const updateCourse = createAsyncThunk(
  'updateCourse/updateCourse',
  async ({ courseId, courseData, thumbnailFile }, { rejectWithValue }) => {
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

      const response = await axios.patch(
        `${apiUrl}/v1/courses/${courseId}`,
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

const updateCourseSlice = createSlice({
  name: 'updateCourse',
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetUpdateCourseState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update course";
      });
  },
});

export const { resetUpdateCourseState } = updateCourseSlice.actions;
export default updateCourseSlice.reducer;