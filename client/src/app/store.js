import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../features/auth/emailCheckSlice"
import registrationReducer from "../features/auth/registrationSlice"
import loginReducer from '../features/auth/loginSlice'
import authenicationReducer from '../features/auth/authorizationSlice'
import logoutReducer from '../features/auth/logoutSlice'
import newCourseReducer from '../features/course/newCourseSlice'
import updateCourseReducer from '../features/course/updateCourseSlice'
import allCoursesReducer from '../features/course/fetchAllCourses'
import paymentReducer from "../features/payment/paymentSlice";

const store = configureStore({
	reducer: {
		emailCheck: emailReducer,
		userRegistration: registrationReducer,
		userLogin: loginReducer,
		authenication: authenicationReducer,
		logout: logoutReducer,
		newCourse: newCourseReducer,
		updateCourse: updateCourseReducer,
		allCourses: allCoursesReducer,
		payment: paymentReducer



	}
})
export default store