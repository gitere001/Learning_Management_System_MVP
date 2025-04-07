
import fs from 'fs/promises';
import path from 'path';
import Course from '../models/course.model.js'
import { v4 as uuidv4 } from 'uuid';
import { isURL } from "../utils/isUrl.js";
import { moveFile } from "../utils/fileService.js";



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
  try {
    const { id } = req.params;

    if (id) {
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
      return res.status(200).json({ success: true, data: course });
    }

    // No ID provided, return all courses
    const courses = await Course.find();
    return res.status(200).json({ success: true, data: courses });

  } catch (error) {
    console.error('Error fetching course(s):', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};
