export const validateCourseForm = (courseData) => {
	const errors = {};

	// Title validation
	if (!courseData.title || courseData.title.trim() === '') {
	  errors.title = 'Course title is required';
	}

	// Description validation
	if (!courseData.description || courseData.description.trim() === '') {
	  errors.description = 'Description is required';
	}

	// Thumbnail validation
	if (!courseData.thumbnail && !courseData.thumbnailFile) {
	  errors.thumbnail = 'At least an image or URL is required';
	}

	// Price validation
	if (!courseData.isFree && (!courseData.price || Number(courseData.price) <= 0)) {
	  errors.price = 'Add course price or mark as free';
	}

	return errors;
  };

  export const ErrorMessage = ({ error }) => {
	if (!error) return null;

	return (
	  <small className="absolute -bottom-5 left-0 text-red-500 text-xs">
		{error}
	  </small>
	);
  };