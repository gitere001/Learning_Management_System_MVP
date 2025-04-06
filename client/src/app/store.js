import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../features/auth/emailCheckSlice"
import registrationReducer from "../features/auth/registrationSlice"

const store = configureStore({
	reducer: {
		emailCheck: emailReducer,
		userRegistration: registrationReducer



	}
})
export default store