import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle, Menu, X } from "lucide-react";
import lessons from "../../data/lessons";

const CourseLearning = () => {
  const location = useLocation();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  useEffect(() => {
      if (location.pathname === `/home/my-courses/${courseId}`) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

      }
    }, [location.pathname]);

  // Set the first lesson as default when component mounts
  useEffect(() => {
    if (lessons.length > 0) {
      setCurrentLesson(lessons[0]);
    }
  }, []);

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setSelectedOption(null);
    setIsLessonCompleted(lesson.isCompleted);
    setIsMobileMenuOpen(false);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === currentLesson.quiz.correctAnswerIndex) {
      setIsLessonCompleted(true);
      // Update the lesson completion status in the imported data
      const updatedLessons = lessons.map((l) =>
        l.id === currentLesson.id ? { ...l, isCompleted: true } : l
      );
      // In a real app, you would update this on the server
    }
  };

  const handleBackToCourses = () => {
    navigate("/home/my-courses");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mt-[70px] w-[97%] mx-auto">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-lg font-semibold text-gray-800 truncate">
          {currentLesson?.title || "Course"}
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex md:w-64 flex-col border-r bg-white">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800 truncate">
              Graphic Design Course
            </h2>
            <p className="text-sm text-gray-500">Lessons: {lessons.length}</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <li key={lesson.id}>
                  <button
                    onClick={() => handleLessonSelect(lesson)}
                    className={`w-full text-left p-4 hover:bg-gray-100 transition-colors flex items-center ${
                      currentLesson?.id === lesson.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {lesson.isCompleted ? (
                      <CheckCircle className="mr-3 text-green-500" size={16} />
                    ) : (
                      <Circle className="mr-3 text-gray-400" size={16} />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  Graphic Design Course
                </h2>
              </div>
              <div className="overflow-y-auto h-full">
                <ul className="divide-y divide-gray-200">
                  {lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <button
                        onClick={() => handleLessonSelect(lesson)}
                        className={`w-full text-left p-4 hover:bg-gray-100 transition-colors flex items-center ${
                          currentLesson?.id === lesson.id
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        {lesson.isCompleted ? (
                          <CheckCircle
                            className="mr-3 text-green-500"
                            size={16}
                          />
                        ) : (
                          <Circle className="mr-3 text-gray-400" size={16} />
                        )}
                        <span>{lesson.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between p-4 bord bg-white">
            <button
              onClick={handleBackToCourses}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="mr-2" size={18} />
              Back to Courses
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {currentLesson?.title || "Loading..."}
            </h1>
            <div className="w-24"></div>
          </div>

          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {currentLesson ? (
              <div className="max-w-4xl mx-auto">
                {/* Video Player */}
                <div className="flex justify-center mb-6">
                  <div className="w-full max-w-[560px] aspect-video rounded-lg overflow-hidden shadow-md bg-black">
                    <iframe
                      src={currentLesson.videoUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={currentLesson.title}
                    ></iframe>
                  </div>
                </div>

                {/* Lesson Content */}
                <div
                  className="prose max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                ></div>

                {/* Quiz Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-semibold mb-4">Quiz</h2>
                  <p className="mb-4">{currentLesson.quiz.question}</p>
                  <div className="space-y-3">
                    {currentLesson.quiz.options.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedOption(index)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedOption === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedOption === null || isLessonCompleted}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      isLessonCompleted
                        ? "bg-green-500 text-white"
                        : selectedOption === null
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isLessonCompleted ? "Lesson Completed" : "Submit Lesson"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p>Loading lesson content...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
