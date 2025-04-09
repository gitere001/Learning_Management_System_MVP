import { ArrowLeft, BookOpen, CheckCircle, Clock, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import buildImageUrl from "../utils/buildurl";
import { formatDate } from "../utils/formatDate";
const apiUrl = import.meta.env.VITE_API_URL;

const EnrolledCourses = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.pathname === '/home/my-courses') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    }
  }, [location.pathname]);

  useEffect(() => {
	const fetchEnrolledCourses = async () => {
	  try {
		const response = await axios.get(
		  `${apiUrl}/v1/courses/enrolled-courses`,
		  {
			withCredentials: true, // This sends cookies (like credentials: 'include')

		  }
		);
		console.log(response.data.data);

		setEnrolledCourses(response.data.data || []);
	  } catch (err) {
		setError(err.response?.data?.message || err.message);
	  } finally {
		setLoading(false);
	  }
	};

	fetchEnrolledCourses();
  }, []);





  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <div className="mt-16 p-6 bg-[#F5F7FA] min-h-screen">
      {/* Header with back button */}
      <div className="flex flex-col gap-1.5 md:flex-row justify-between mb-8">
        <button
          onClick={handleBackClick}
          className="flex items-center text-[#0069AA] hover:text-[#005589]"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-[#333333]">
          My Enrolled Courses
        </h1>

        {/* Empty div for spacing */}
        <div className="w-10"></div>
      </div>

      {/* Search bar */}
      <div className="mb-8 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search your courses..."
            className="input-field pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {/* Courses list */}
      {enrolledCourses.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No enrolled courses yet
          </h3>
          <p className="text-gray-500">
            Browse our courses and enroll to get started!
          </p>
          <button
            className="lms-button-primary mt-6 px-6 py-3"
            onClick={() => navigate("/home")}
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="stat-card hover:shadow-lg transition-shadow duration-300"
            >
              {/* Course thumbnail */}
              <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={course.thumbnail.startsWith("http") ? course.thumbnail : buildImageUrl(course.thumbnail)}
                  alt={course.courseId.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-[#333333]">
                    {course.courseId.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {course.status === "completed"
                      ? "Completed"
                      : "In Progress"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.courseId.description}
                </p>

                {/* Progress bar */}
                {course.status === "in-progress" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#0069AA] h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Course metadata */}
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>Enrolled {formatDate(course.enrolledOn)}</span>
                  </div>

                </div>

                {/* Action button */}
                <div className="mt-auto">
                  <button
				  onClick={()=> navigate(`/home/my-courses/${course.courseId}`)}
                    className={`w-full py-2 rounded-lg mt-auto  ${
                      course.status === "completed"
                        ? "lms-button-primary bg-[#0069AA]"
                        : "lms-button-accent bg-[#E32726]"
                    }`}
                  >
                    {course.status === "completed"
                      ? "View Course"
                      : "Continue Learning"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
