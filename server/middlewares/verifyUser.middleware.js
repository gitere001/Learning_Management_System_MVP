import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Middleware to verify refresh token and attach user to request
 * This middleware checks if a valid refresh token exists in cookies,
 * verifies it, and attaches the corresponding user to the request object
 */
export const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  console.log("this is the cookies", req.cookies);

  // Check if refresh token exists
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please log in."
    });
  }

  try {
    // Verify the token
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find the user
    const user = await User.findById(payload.userId);

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again."
      });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    // Handle different types of errors
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again."
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again."
      });
    } else {
      console.error("Token verification error:", error);
      return res.status(500).json({
        success: false,
        message: "Authentication error. Please try again."
      });
    }
  }
};

/**
 * Similar middleware for access token verification
 * Can be used for protected routes
 */
export const verifyAccessToken = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please log in."
    });
  }

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again."
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again or refresh your token."
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication. Please login again."
      });
    }
  }
};