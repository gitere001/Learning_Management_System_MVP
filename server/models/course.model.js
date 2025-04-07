import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail is required']
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  isFree: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Ready', 'Draft'],
    default: 'Draft'
  }
});

const Course = mongoose.model('Course', courseSchema)
export default Course;