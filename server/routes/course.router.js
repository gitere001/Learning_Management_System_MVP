import express from 'express'
import upload from '../utils/fileUpload.js'
import { checkEnrollment, createCourse, enrollCourse, fetchEnrolledCourses, getCourse, toggleCourseStatus } from '../controllers/course.controller.js'
import { validateCourseData } from '../middlewares/validateCourseData.middleware.js'
import { verifyRefreshToken } from '../middlewares/verifyUser.middleware.js'

const courseRouter = express.Router()

courseRouter.post("/add-new-course", upload.single('thumbnail'), validateCourseData, createCourse)
courseRouter.get("/admin/all-courses", verifyRefreshToken, getCourse)
courseRouter.get("/admin/:id", verifyRefreshToken, getCourse)
courseRouter.patch("/admin/:courseId/status", toggleCourseStatus)
courseRouter.post("/enrolled-courses/:courseId/enroll", verifyRefreshToken, enrollCourse)
courseRouter.get("/:courseId/enrollment-status", verifyRefreshToken, checkEnrollment);
courseRouter.get("/enrolled-courses", verifyRefreshToken, fetchEnrolledCourses)
export default courseRouter