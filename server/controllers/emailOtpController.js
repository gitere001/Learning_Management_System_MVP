import User from "../models/user.model.js";

export const userExists = async (req, res) => {
	const { email } = req.body;

	if (!email) {
	  return res
		.status(400)
		.json({ success: false, message: "Email is required" });
	}

	try {
	  const user = await User.findOne({ email });

	  if (user) {
		return res
		  .status(400)
		  .json({ success: false, message: "User already exists" });
	  } else {
		// await sendOtp(email);

		return res.status(200).json({ success: true, message: "New user" });
	  }
	} catch (error) {
	  console.error(error);
	  res
		.status(500)
		.json({ success: false, message: "Server error, please try again" });
	}
  };