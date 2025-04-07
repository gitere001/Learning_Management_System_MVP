import React, { useEffect, useState } from "react";
import {
  BookOpen,
  PlusCircle,
  Search,
  Trash2,
  Eye,
  Calendar,
} from "lucide-react";
// import courses from "../../data/sampleAdminCourses.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../features/course/fetchAllCourses";

const AdminCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, courses, error } = useSelector((state) => state.allCourses);
  useEffect(()=> {
	dispatch(fetchAllCourses())

  }, [dispatch])


  //   const [searchQuery, setSearchQuery] = useState('');

  //   const filteredCourses = courses.filter(course =>
  //     course.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  //   const handleDeleteCourse = (courseId) => {
  //     setCourses(courses.filter(course => course._id !== courseId));
  //   };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price, isFree) => {
    if (isFree) return "Free";
    return `KES ${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--text-dark)]">
          All Courses
        </h2>
        <button
          onClick={() => navigate("/admin-dashboard/add-new-course")}
          className="flex items-center px-4 py-2 bg-[var(--primary-blue)] text-white rounded-lg hover:bg-[var(--primary-blue)]/90 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New Course
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          //   value={searchQuery}
          //   onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
        />
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium">
                  {formatPrice(course.price, course.isFree)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2 line-clamp-1">
                  {course.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(course.createdAt)}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => console.log("View course:", course._id)}
                    className="flex items-center text-[var(--primary-blue)] hover:underline"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Course
                  </button>
                  <button className="flex items-center text-[var(--accent-red)] hover:underline">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <BookOpen className="mx-auto mb-4 w-10 h-10 text-[var(--primary-blue)]" />
          <p className="text-lg font-medium text-gray-600">
            No courses added yet
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Click “Add New Course” to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
