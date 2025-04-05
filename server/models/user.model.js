import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  middleName: {
    type: String,
    default: null,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
    required: true
  },
  interest: {
    type: String,
    enum: [
      'Graphic Design',
      'Digital Marketing',
      'Web Design',
      'Full-Stack Web Development',
      'Data Science',
      'Other'
    ],
    default: null
  },
  department: {
    type: String,
    enum: [
      'Sales',
      'Education',
      'Support',
      'Management',
      'IT',
      'HR',
      'Marketing'
    ],
    default: null
  },
  passwordResetToken: {
    type: String,
    default: null
  },
  passwordResetExpires: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Add index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model('User', userSchema);

export default User;
