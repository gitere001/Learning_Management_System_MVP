import React, { useEffect, useRef, useState } from "react";
import { X, Image as ImageIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  resetCourseState,
} from "../../features/course/newCourseSlice";
import Feedback from "../Feedback";
import { validateCourseForm, ErrorMessage } from '../../utils/validationUtils.jsx'

const AddCourseModal = () => {
  const { loading, success, error } = useSelector((state) => state.newCourse);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    thumbnailFile: null,
    price: "0",
    isFree: false,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const successTimerRef = useRef(null);
  const errorTimerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [success, error]);

  useEffect(() => {
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);

    if (success && !error) {
      successTimerRef.current = setTimeout(() => {
        dispatch(resetCourseState());
        setPreviewUrl("");
        setCourseData({
          title: "",
          description: "",
          thumbnail: "",
          thumbnailFile: null,
          price: "0",
          isFree: false,
        });
        setFormErrors({});
        setTouched({});
      }, 2000);
    }

    if (error) {
      errorTimerRef.current = setTimeout(() => {
        dispatch(resetCourseState());
      }, 2000);
    }

    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, [dispatch, success, error]);

  const closeModal = () => {
    setPreviewUrl("");
    setCourseData({
      title: "",
      description: "",
      thumbnail: "",
      thumbnailFile: null,
      price: "0",
      isFree: false,
    });
    setFormErrors({});
    setTouched({});
    navigate("/admin-dashboard");
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = e.target.checked;
      setCourseData((prev) => ({
        ...prev,
        [name]: checked,
        price: checked ? "0" : prev.price,
      }));
    } else {
      setCourseData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourseData((prev) => ({
        ...prev,
        thumbnailFile: file,
        thumbnail: "",
      }));
      setPreviewUrl(URL.createObjectURL(file));
      setFormErrors(prev => ({ ...prev, thumbnail: null }));
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setCourseData((prev) => ({
      ...prev,
      thumbnail: url,
      thumbnailFile: null,
    }));
    setPreviewUrl(url);
    setFormErrors(prev => ({ ...prev, thumbnail: null }));
  };

  const handleRemoveThumbnail = () => {
    setCourseData((prev) => ({
      ...prev,
      thumbnail: "",
      thumbnailFile: null,
    }));
    setPreviewUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateCourseForm(courseData);
    setFormErrors(errors);
    setTouched({
      title: true,
      description: true,
      thumbnail: true,
      price: true
    });

    if (Object.keys(errors).length === 0) {
      dispatch(
        createCourse({
          courseData: {
            title: courseData.title,
            description: courseData.description,
            price: courseData.price,
            isFree: courseData.isFree,
            thumbnail: courseData.thumbnail,
          },
          thumbnailFile: courseData.thumbnailFile,
        })
      );
    }
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative">
      {error ? (
        <Feedback isSuccess={false} message={error} />
      ) : success ? (
        <Feedback isSuccess={true} message={success} />
      ) : null}
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-xl font-semibold text-[#333333]">Add New Course</h3>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <form className="p-6" onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Thumbnail Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Thumbnail
            </label>
            <div className="flex items-start gap-4 relative pb-2">
              <div className={`w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden ${
                formErrors.thumbnail ? "border-red-500" : "border-gray-300"
              }`}>
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Course thumbnail"
                    className="w-full h-full object-cover"
                    onError={() =>
                      setPreviewUrl(
                        "https://via.placeholder.com/128?text=Invalid+URL"
                      )
                    }
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Choose file</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={!!courseData.thumbnail}
                    />
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Or use URL
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={courseData.thumbnail}
                    onChange={handleUrlChange}
                    placeholder="Enter image URL"
                    className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0069AA] ${
                      formErrors.thumbnail ? "border-red-500" : "border-gray-300"
                    }`}
                    disabled={!!courseData.thumbnailFile}
                  />
                </div>
              </div>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="absolute cursor-pointer bottom-2 left-4 bg-[#E32726] hover:bg-[#E32726]/90 transition-all text-white rounded-md px-2"
                >
                  Remove
                </button>
              )}
            </div>
            <ErrorMessage error={formErrors.thumbnail} />
          </div>

          {/* Title Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              placeholder="eg., Introduction to Web Development"
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0069AA] ${
                formErrors.title ? "border-red-500" : "border-gray-300"
              }`}

            />
            <ErrorMessage error={formErrors.title} />
          </div>

          {/* Description Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Description
            </label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe what student will learn in this course"
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0069AA] ${
                formErrors.description ? "border-red-500" : "border-gray-300"
              }`}
              
            />
            <ErrorMessage error={formErrors.description} />
          </div>

          {/* Price Input with Free Checkbox */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Price
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    KES
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={courseData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    disabled={courseData.isFree}
                    className={`w-full rounded-lg border pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0069AA] ${
                      formErrors.price ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFree"
                  checked={courseData.isFree}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#0069AA] rounded border-gray-300 focus:ring-[#0069AA]"
                />
                <span className="text-sm text-gray-700">Free Course</span>
              </label>
            </div>
            <ErrorMessage error={formErrors.price} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0069AA] text-white rounded-lg hover:bg-[#0069AA]/90"
          >
            {loading ? "Submiting..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseModal;