import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import buildImageUrl from "../../utils/buildurl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openPaymentModal } from "../../features/payment/paymentSlice";

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const navigate = useNavigate();

  return (
    <div
      className={` transition-all duration-300 rounded-lg shadow-2xl  ${
        isHovered ? "shadow-lg" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="">
        {/* Thumbnail */}
        <div className="w-full">
          <img
            src={
              course.thumbnail.startsWith("http")
                ? course.thumbnail
                : buildImageUrl(course.thumbnail)
            }
            alt={course.title}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>

        {/* Course Info */}
        <div className="flex-1 p-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-[#333333]">
                {course.title}
              </h3>
              <div className="flex items-center gap-4 mt-2">
                <span
                  className={`font-medium ${
                    course.isFree ? "text-green-600" : "text-[#0069AA]"
                  }`}
                >
                  {course.isFree ? "Free" : `Kes ${course.price}`}
                </span>
                <span className="text-sm text-gray-500">
                  Created: {formatDate(course.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Course Details - Always visible now */}
          <div className="mt-4 pt-4 border-t border-gray-200 ">
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => {
                  navigate(`/home/checkout/${course._id}`);
                  dispatch(openPaymentModal());
                }}
                className="lms-button-primary"
              >
                Enroll Now
              </button>
              <button className="lms-button-accent">Save for Later</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;