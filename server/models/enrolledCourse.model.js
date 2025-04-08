import mongoose from 'mongoose';

const enrolledCourseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required']
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  },
  enrolledDate: {
    type: Date,
    default: Date.now
  },
  // You might want to add these fields later:
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add compound index to prevent duplicate enrollments
enrolledCourseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Add index for frequently queried fields
enrolledCourseSchema.index({ userId: 1, status: 1 });
enrolledCourseSchema.index({ courseId: 1 });

const EnrolledCourse = mongoose.model('EnrolledCourse', enrolledCourseSchema);

export default EnrolledCourse;