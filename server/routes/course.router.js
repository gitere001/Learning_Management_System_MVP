import express from 'express'
import upload from '../utils/fileUpload.js'
import { createCourse, getCourse } from '../controllers/course.controller.js'
import { validateCourseData } from '../middlewares/validateCourseData.middleware.js'

const courseRouter = express.Router()

courseRouter.post("/add-new-course", upload.single('thumbnail'), validateCourseData, createCourse)
courseRouter.get("/admin/all-courses", getCourse)
courseRouter.get("/admin/:id", getCourse)
export default courseRouter