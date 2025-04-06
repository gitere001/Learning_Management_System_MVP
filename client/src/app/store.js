import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../features/auth/emailCheckSlice"
import registrationReducer from "../features/auth/registrationSlice"
import loginReducer from '../features/auth/loginSlice'
import authenicationReducer from '../features/auth/authorizationSlice'
import logoutReducer from '../features/auth/logoutSlice'

const store = configureStore({
	reducer: {
		emailCheck: emailReducer,
		userRegistration: registrationReducer,
		userLogin: loginReducer,
		authenication: authenicationReducer,
		logout: logoutReducer



	}
})
export default store