import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CourseDetails from "./CourseDetails";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourse } from "../../utils/fetchCourse";
import lessons from "../../data/lessons";

const apiUrl = import.meta.env.VITE_API_URL;

function AddLesson() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [course, setCourse] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchCourse(apiUrl, courseId, setCourse);
  }, [courseId]);

  // 💡 Create elements for each lesson
  const lessonElements = lessons.map((lesson) => (
    <div
      key={lesson.id}
      className="p-4 border rounded-lg shadow-sm bg-gray-50 flex justify-between items-center"
    >
      <span className="text-gray-800 font-medium">{lesson.title}</span>
      <div className="space-x-2">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
          Update
        </button>
        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <CourseDetails
          title={course.title}
          description={course.description}
          courseId={courseId}
        />

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Lessons</h2>
            <button
              onClick={() =>
                navigate(`/admin-dashboard/courses/${courseId}/add-lesson`)
              }
              className="lms-button-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Lesson
            </button>
          </div>

          {lessons.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No lessons added yet. Click "Add Lesson" to create your first
              lesson.
            </p>
          ) : (
            <div className="space-y-4">{lessonElements}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddLesson;
