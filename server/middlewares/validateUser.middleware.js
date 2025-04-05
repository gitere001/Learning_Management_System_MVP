// middlewares/validateUser.middleware.js

export const validateUserRegistration = (req, res, next) => {
	const { firstName, lastName, email, password, role, interest, department } = req.body;

	// Check if all required fields are provided
	if (!firstName) {
	  return res.status(400).json({ success: false, message: "First name is required" });
	}
	if (!lastName) {
	  return res.status(400).json({ success: false, message: "Last name is required" });
	}
	if (!email) {
	  return res.status(400).json({ success: false, message: "Email is required" });
	}
	if (!password) {
	  return res.status(400).json({ success: false, message: "Password is required" });
	}
	if (!role) {
	  return res.status(400).json({ success: false, message: "Role is required" });
	}

	// Validate email format (simple check)
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(email)) {
	  return res.status(400).json({ success: false, message: "Invalid email format" });
	}

	// Check for role and validate corresponding fields
	if (role === 'student') {
	  if (!interest) {
		return res.status(400).json({ success: false, message: "Interest is required for students" });
	  }
	  // Check if interest is one of the valid options
	  const validInterests = ['Graphic Design', 'Digital Marketing', 'Web Design', 'Full-Stack Web Development', 'Data Science', 'Other'];
	  if (!validInterests.includes(interest)) {
		return res.status(400).json({ success: false, message: `Interest must be one of: ${validInterests.join(', ')}` });
	  }
	} else if (role === 'admin') {
	  if (!department) {
		return res.status(400).json({ success: false, message: "Department is required for admins" });
	  }
	  // Check if department is one of the valid options
	  const validDepartments = ['Sales', 'Education', 'Support', 'Management', 'IT', 'HR', 'Marketing'];
	  if (!validDepartments.includes(department)) {
		return res.status(400).json({ success: false, message: `Department must be one of: ${validDepartments.join(', ')}` });
	  }
	} else {
	  // If role is neither student nor admin
	  return res.status(400).json({ success: false, message: "Role must be either 'student' or 'admin'" });
	}

	// If all validations pass, proceed to the next middleware or controller
	next();
  };
