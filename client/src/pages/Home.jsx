import React, { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Clock, Search } from "lucide-react";
import StatCard from "../components/AdminDashboard/StatsCard";
import CourseCard from "../components/studentDashboard/CourseCard";
// import courses from '../data/data';
import { fetchAllStudentCourses } from "../utils/fetchCourse";
import axios from "axios";
import { useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const StudentDashboard = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    pendingCompletion: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (location.pathname === '/home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/auth/stats`, {
          withCredentials: true,
        });
        const { enrolledCourses, completedCourses, pendingCompletion } =
          response.data.stats;
        console.log(response.data);
        setStats({
          enrolledCourses,
          completedCourses,
          pendingCompletion,
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    fetchAllCourses();
  }, []);
  async function fetchAllCourses() {
    setCourses(await fetchAllStudentCourses(apiUrl));
  }

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen mt-[64px]">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Enrolled Courses"
          value={stats.enrolledCourses}
          icon={<BookOpen size={20} />}
          iconBgColor="#0069AA"
        />
        <StatCard
          title="Completed Courses"
          value={stats.completedCourses}
          icon={<CheckCircle size={20} />}
          iconBgColor="#10B981" // Using a green color for completed
        />
        <StatCard
          title="Pending Completion"
          value={stats.pendingCompletion}
          icon={<Clock size={20} />}
          iconBgColor="#E32726"
        />
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
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

      {/* Course Cards Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#333333]">Available Courses</h2>
        {filteredCourses.length > 0 ? (
         <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {filteredCourses.map((course) => (
           <CourseCard
             key={course._id}
             course={course}
           />
         ))}
       </section>

        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No courses found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;