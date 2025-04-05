import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const generateTokens = (user) => {
  // Set the access token expiration based on user role
  const accessTokenExpiry = user.role === 'admin' ? '1h' : '24h';

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: accessTokenExpiry }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return {
    accessToken,
    refreshToken,

  };
};