import { Pencil, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseDetails({title, description, courseId}) {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <button onClick={() => navigate(`/admin-dashboard/courses/update-course/${courseId}`)} className="flex items-center btn-outline">
            <Pencil className="w-4 h-4 mr-2" />
            Edit Details
          </button>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
