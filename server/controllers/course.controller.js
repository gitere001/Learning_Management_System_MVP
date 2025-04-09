
import fs from 'fs/promises';
import path from 'path';
import Course from '../models/course.model.js'
import { v4 as uuidv4 } from 'uuid';
import { isURL } from "../utils/isUrl.js";
import { moveFile } from "../utils/fileService.js";
import EnrolledCourse from '../models/enrolledCourse.model.js';



export const createCourse = async (req, res) => {
  try {
    const { title, description, price, isFree, thumbnail: thumbnailUrl } = req.body;
    const thumbnailFile = req.file;

    const newCourse = new Course({
      title,
      description,
      price: isFree ? 0 : Number(price),
      isFree: Boolean(isFree)
    });

    // Handle thumbnail
    let thumbnailPath;
    if (thumbnailFile) {
      // Create course folder using MongoDB _id (after save)
      const courseFolder = path.join('uploads', 'courses', newCourse._id.toString());

      // Use moveFile utility (returns relative path)
      thumbnailPath = await moveFile(
        thumbnailFile.path, // Temp file path
        courseFolder,      // Target directory
        `thumbnail${path.extname(thumbnailFile.originalname)}` // Filename
      );

    } else if (thumbnailUrl) {
      thumbnailPath = thumbnailUrl;
    } else {
      throw new Error('Thumbnail file or URL required');
    }

    // Update course with thumbnail path and save
    newCourse.thumbnail = thumbnailPath;
    await newCourse.save();

    res.status(201).json({success: true, message: "Course Created Successfully"});

  } catch (error) {
    // Cleanup if error occurs after folder creation
    if (newCourse?._id && thumbnailFile) {
      const courseFolder = path.join('uploads', 'courses', newCourse._id.toString());
      await fs.rm(courseFolder, { recursive: true, force: true }).catch(console.error);
    }
    res.status(400).json({ success: false, message: error.message });
  }
};
export const updateCourseThumbnail = async (req, res) => {
  try {
    const { courseId } = req.params;
    const thumbnailFile = req.file;
    const { thumbnail: thumbnailUrl } = req.body;

    if (!thumbnailFile && !thumbnailUrl) {
      return res.status(400).json({ error: 'Thumbnail file or URL required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    let newThumbnail;
    if (thumbnailFile) {
      // Handle file upload
      const uploadsDir = path.join(process.cwd(), 'uploads', 'courses');
      await fs.mkdir(uploadsDir, { recursive: true });

      const fileExt = path.extname(thumbnailFile.originalname);
      const filename = `${uuidv4()}${fileExt}`;
      newThumbnail = path.join('uploads', 'courses', filename);

      await fs.rename(thumbnailFile.path, path.join(process.cwd(), newThumbnail));

      // Delete old file if it was a local upload
      if (course.thumbnail && !isURL(course.thumbnail)) {
        await fs.unlink(path.join(process.cwd(), course.thumbnail)).catch(console.error);
      }
    } else {
      newThumbnail = thumbnailUrl;
    }

    course.thumbnail = newThumbnail;
    await course.save();

    return res.json(course);
  } catch (error) {
    console.error('Error updating thumbnail:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const getCourse = async (req, res) => {
  const user = req.user
  console.log(user);
  try {
    const { id } = req.params;

    if (id) {
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
      return res.status(200).json({ success: true, data: course });
    }

    if (user.role === "admin") {

      const courses = await Course.find()
      .sort({ createdAt: -1 })
      .lean();
      return res.status(200).json({ success: true, data: courses });
    } else if (user.role === "student") {
      const courses = await Course.find({ status: "Ready" });
      return res.status(200).json({ success: true, data: courses });

    }

  } catch (error) {
    console.error('Error fetching course(s):', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};
export const toggleCourseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Toggle between 'Ready' (published) and 'Draft' (unpublished)
    const newStatus = course.status === 'Ready' ? 'Draft' : 'Ready';
    course.status = newStatus;

    await course.save();

    return res.status(200).json({
      success: true,

    });

  } catch (error) {
    console.error('Error toggling course status:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

export const checkEnrollment = async (req, res) => {
  try {
    // Get courseId from request params instead of body for GET request
    const courseId = req.params.courseId;
    const userId = req.user._id;

    // Validate input
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required"
      });
    }

    // Check if the user is already enrolled in the course
    const enrollment = await EnrolledCourse.findOne({
      userId,
      courseId
    });

    return res.status(200).json({
      success: true,
      isEnrolled: !!enrollment,
      enrollment: enrollment || null
    });

  } catch (error) {
    console.error("Enrollment check error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to check enrollment status",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// export const fetchStudentCourse = async (req, res) => {

// }

export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = req.user;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if course is published
    if (course.status !== 'Ready') {
      return res.status(400).json({
        success: false,
        message: 'Course is not available for enrollment'
      });
    }

    // Check if user is already enrolled
    const existingEnrollment = await EnrolledCourse.findOne({
      userId: user._id,
      courseId: course._id
    });

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message: 'User is already enrolled in this course'
      });
    }

    // Create new enrollment
    const enrollment = await EnrolledCourse.create({
      userId: user._id,
      courseId: course._id,
      status: 'in-progress'
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: enrollment
    });

  } catch (error) {
    console.error('Error enrolling in course:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

export const fetchEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    // Find all enrollments for this user
    const enrollments = await EnrolledCourse.find({ userId })
      .select('status progress createdAt') // Only get these fields from enrollment
      .populate({
        path: 'courseId',
        select: '_id title thumbnail' // Only get these fields from course
      })
      .sort({ createdAt: -1 })
      .lean();

    // Format the response to exactly match requested structure
    const enrolledCourses = enrollments.map(enrollment => ({
      enrollmentId: enrollment._id,
      courseId: enrollment.courseId._id,
      title: enrollment.courseId.title,
      thumbnail: enrollment.courseId.thumbnail,
      enrolledOn: enrollment.createdAt,
      status: enrollment.status,
      progress: enrollment.progress
    }));

    return res.status(200).json({
      success: true,
      count: enrolledCourses.length,
      data: enrolledCourses
    });

  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};