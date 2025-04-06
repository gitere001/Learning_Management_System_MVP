import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/jwt.js";
import { verifyPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
	try {
		const { firstName, middleName, lastName, email, password, interest, role, department } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ success: false, message: "Email already in use" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user object
		const newUser = new User({
			firstName,
			middleName,
			lastName,
			email,
			password: hashedPassword,
			role,
			interest: role === 'student' ? interest : undefined,
			department: role === 'admin' ? department : undefined
		});

		// Save the new user to the database
		await newUser.save();

		// Send a success response
		res.status(201).json({ success: true, message: "User registered successfully" });
	} catch (error) {
		console.error("Registration Error:", error);
		res.status(500).json({ success: false, message: "An error occurred while registering the user" });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ success: false, message: "All fields are required" });
	}

	try {
		const user = req.user;

		const isPasswordValid = await verifyPassword(password, user.password);

		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		const { accessToken, refreshToken } = generateTokens(user);
		console.log("accessToken", accessToken);
		console.log("refreshToken", refreshToken)

		const accessTokenExpiration = user.role === 'admin' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

		// For accessToken
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // false in development (HTTP)
			sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // "none" if cross-site
			maxAge: accessTokenExpiration,
			path: "/", // Ensures cookie is available on all routes
		});

		// For refreshToken
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: "/",
		});

		res.status(200).json({
			success: true,
			message: "Login successful!",
			role: user.role,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Server error, please try again" });
	}
};

const refreshToken = async (req, res) => {


	const { refreshToken } = req.cookies;
	// console.log("refreshToken", refreshToken);

	if (!refreshToken) {
		return res.status(401).json({ success: false, message: "Refresh token required" });
	}

	try {
		const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const user = await User.findById(payload.userId);

		if (!user) {
			return res.status(401).json({ success: false, message: "User not found" });
		}

		const { role: requestedRole } = req.body;
		if (requestedRole && requestedRole !== user.role) {
			return res.status(403).json({ success: false, message: "Forbidden: Role mismatch" });
		}

		let accessTokenExpiration = 24 * 60 * 60 * 1000;

		if (user.role === 'admin') {
			const currentTime = Date.now();
			const lastLoginTime = user.lastLogin?.getTime() || currentTime;

			if (currentTime - lastLoginTime > 2 * 60 * 60 * 1000) {
				return res.status(401).json({ success: false, message: "Login expired, please log in again" });
			}

			accessTokenExpiration = 2 * 60 * 60 * 1000;
		}

		const tokens = generateTokens(user);

		res.cookie("accessToken", tokens.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: accessTokenExpiration,
			expires: new Date(Date.now() + accessTokenExpiration),
		});

		return res.json({
			success: true,
			message: "Valid refresh token",
			role: user.role,
			user: user,
		});
	} catch (error) {
		return res.status(401).json({ success: false, message: "Invalid refresh token" });
	}
};

const logoutUser = (req, res) => {
	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");
	return res.status(200).json({ success: true, message: "Logout successful!" });
};

export { loginUser, refreshToken, logoutUser };
