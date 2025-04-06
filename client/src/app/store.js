import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../features/auth/emailCheckSlice"
import registrationReducer from "../features/auth/registrationSlice"
import loginReducer from '../features/auth/loginSlice'

const store = configureStore({
	reducer: {
		emailCheck: emailReducer,
		userRegistration: registrationReducer,
		userLogin: loginReducer



	}
})
export default store