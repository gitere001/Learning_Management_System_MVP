import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function LessonForm() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate()
  const {courseId} = useParams()
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const addQuiz = () => {
    if (currentQuiz.question && currentQuiz.options.every(opt => opt)) {
      setQuizzes([...quizzes, {
        id: crypto.randomUUID(),
        ...currentQuiz
      }]);
      setCurrentQuiz({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      });
    }
  };

  return (
    <div className=" bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Lesson</h2>
          <button onClick={()=> navigate(`/admin-dashboard/courses/${courseId}`)} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Lesson Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Video Upload</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a video</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="sr-only"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">PDF Upload</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a PDF</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quizzes</h3>
            {quizzes.map((quiz, index) => (
              <div key={quiz.id} className="mb-4 p-4 bg-gray-50 rounded-md">
                <p className="font-medium">Question {index + 1}: {quiz.question}</p>
                <ul className="mt-2 space-y-1">
                  {quiz.options.map((option, optIndex) => (
                    <li key={optIndex} className={optIndex === quiz.correctAnswer ? 'text-green-600 font-medium' : ''}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Question"
                value={currentQuiz.question}
                onChange={(e) => setCurrentQuiz({...currentQuiz, question: e.target.value})}
                className="input-field"
              />
              {currentQuiz.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...currentQuiz.options];
                      newOptions[index] = e.target.value;
                      setCurrentQuiz({...currentQuiz, options: newOptions});
                    }}
                    className="input-field"
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuiz.correctAnswer === index}
                    onChange={() => setCurrentQuiz({...currentQuiz, correctAnswer: index})}
                    className="mt-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addQuiz}
                className="lms-button-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Quiz
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={()=> navigate(`/admin-dashboard/courses/${courseId}`)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="lms-button-primary"
            >
              Save Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}