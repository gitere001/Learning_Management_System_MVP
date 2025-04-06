import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    default: null,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "non-binary", "prefer-not-to-say"],
    required: false,
  },
  interests: {
    type: [String],
    enum: [
      "Graphic Design",
      "Digital Marketing",
      "Web Development",
      "Data Science",
      "Other",
    ],
    default: [],
  },
  otherInterest: {
    type: String,
    default: "",
  },
  referralSource: {
    type: String,
    enum: [
      "",
      "social-media",
      "friend-referral",
      "google",
      "email",
      "other",
    ],
    default: "",
  },
  department: {
    type: String,
    enum: [
      "Sales",
      "Education",
      "Support",
      "Management",
      "IT",
      "HR",
      "Marketing",
    ],
    default: null,
  },
  passwordResetToken: {
    type: String,
    default: null,
  },
  passwordResetExpires: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model("User", userSchema);

export default User;
