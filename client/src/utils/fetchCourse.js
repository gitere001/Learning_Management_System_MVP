import axios from "axios";
import buildImageUrl from "./buildurl";

export const fetchCourse = async (apiUrl, courseId, setCourse) => {
  try {
    const response = await axios.get(`${apiUrl}/v1/courses/admin/${courseId}`, {
      withCredentials: true,
    });

    const course = response.data.data;

    setCourse({
      _id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      isFree: course.isFree,
      status: course.status,
      createdAt: course.createdAt,
      thumbnail: course.thumbnail.startsWith("http")
        ? course.thumbnail
        : buildImageUrl(course.thumbnail),
    });
  } catch (error) {
    console.error("Error fetching course:", error);
  }
};

export const fetchAllStudentCourses = async (apiUrl) => {
  try {
    const response = await axios.get(`${apiUrl}/v1/courses/admin/all-courses`, {
      withCredentials: true,
    });



    return response.data.data;
  } catch (error) {
    console.log(error);

  }

}




export const toggleStatus = async (apiUrl, courseId) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/v1/courses/admin/${courseId}/status`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data


  } catch (error) {
    console.error("Error toggling course status:", error);
    throw error;
  }
};

