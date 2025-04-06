import express from "express";
import { loginUser, logoutUser, refreshToken, registerUser } from "../controllers/auth.controller.js";
import { checkEmail, checkRole } from "../middlewares/auth.middleware.js";
import { userExists } from "../controllers/emailOtpController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/check-email", userExists)
authRouter.post("/login", checkEmail, checkRole, loginUser)
authRouter.post("/refresh-token", refreshToken)
authRouter.post("/logout", logoutUser);

export default authRouter;
