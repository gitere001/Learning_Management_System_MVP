
import User from "../models/user.model.js";


const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }


  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }


  req.user = user;
  next();
};


const checkRole = (req, res, next) => {
  const { role: requestedRole } = req.body;
  const user = req.user;

  // Check if role is provided in the request body
  if (!requestedRole) {
    return res.status(400).json({ success: false, message: "Role is required" });
  }

  // Check if the provided role is either 'student' or 'admin'
  if (requestedRole !== "student" && requestedRole !== "admin") {
    return res.status(400).json({ success: false, message: "Invalid role. Role must be either 'student' or 'admin'" });
  }

  // Check if the requested role matches the user's role
  if (requestedRole !== user.role) {
    return res.status(403).json({ success: false, message: "Forbidden: Role mismatch" });
  }

  next();
};



export { checkEmail, checkRole };
