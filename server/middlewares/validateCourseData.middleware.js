export const validateCourseData = (req, res, next) => {
	const errors = [];

	const { title, description, price, isFree, thumbnail } = req.body;
	const imageFile = req.file;
	
	// Check if title is provided
	if (!title || title.trim() === '') {
	  errors.push("Title is required");
	}

	// Check if description is provided
	if (!description || description.trim() === '') {
	  errors.push("Description is required");
	}

	// Optional: Only validate price if course is not free
	if (isFree === "false" || isFree === false) {
	  if (!price || isNaN(price) || Number(price) <= 0) {
		errors.push("Valid price is required for paid courses");
	  }
	}

	// Check if at least one image or thumbnail is provided
	if (!imageFile && !thumbnail) {

	  errors.push("At least one image file or thumbnail URL is required");
	}

	// Return errors if validation fails
	if (errors.length > 0) {
	  return res.status(400).json({ success: false, message: errors });
	}

	// Proceed to the next middleware if no errors
	next();
  };
