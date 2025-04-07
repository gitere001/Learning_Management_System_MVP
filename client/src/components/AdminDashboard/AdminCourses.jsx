import React, { useEffect, useState } from "react";
import {
  BookOpen,
  PlusCircle,
  Search,
  Trash2,
  Eye,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../features/course/fetchAllCourses";
import buildImageUrl from "../../utils/buildurl";
// import courses from "../../data/sampleAdminCourses";

const AdminCourses = () => {
  const { loading, courses, error } = useSelector((state) => state.allCourses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [confirmationText, setConfirmationText] = useState("");

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

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

  const handleToggleStatus = (courseId, currentStatus) => {
    console.log(`Toggling course ${courseId} from ${currentStatus} to ${currentStatus === 'Ready' ? 'Draft' : 'Ready'}`);
  };

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
    setConfirmationText("");
  };

  const handleConfirmDelete = () => {
    if (confirmationText === "DELETE") {
      console.log("Deleting course:", courseToDelete._id);
      // Add your delete logic here
    }
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
    setConfirmationText("");
  };

  return (
    <div className="space-y-6 relative">
      {/* Delete Confirmation Modal - Now contained within parent */}
      {showDeleteModal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-xl shadow-lg p-6 mx-auto max-w-2xl">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[var(--text-dark)] mb-2">
                Delete Course?
              </h3>
              <p className="text-gray-600 mb-4">
                This action cannot be undone. If there are users subscribed to "
                {courseToDelete?.title}", they might lose access.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Type <span className="font-mono bg-gray-100 px-2 py-1 rounded">DELETE</span> to confirm:
                </p>
                <input
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Type DELETE here"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={confirmationText !== "DELETE"}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    confirmationText === "DELETE"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
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
                  src={course.thumbnail.startsWith('http') ? course.thumbnail : buildImageUrl(course.thumbnail)}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium">
                  {formatPrice(course.price, course.isFree)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[var(--text-dark)] line-clamp-1 flex-1">
                    {course.title}
                  </h3>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'Ready'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {course.status || 'Draft'}
                  </span>
                </div>
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
                    View
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleStatus(course._id, course.status || 'Draft')}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        course.status === 'Ready'
                          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          : 'bg-[var(--primary-blue)] text-white hover:bg-[var(--primary-blue)]/90'
                      } transition-colors`}
                    >
                      {course.status === 'Ready' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course)}
                      className="flex items-center text-[var(--accent-red)] hover:underline"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
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
            Click "Add New Course" to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;