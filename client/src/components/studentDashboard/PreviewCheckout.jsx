import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mpesaIcon from "../../assets/mpesa-icon.png";
import { fetchCourse } from "../../utils/fetchCourse";
const apiUrl = import.meta.env.VITE_API_URL;
import PhoneInput2 from "./phoneInput2";
import { useDispatch, useSelector } from "react-redux";
import {
  closePaymentModal,
  resetPaymentStatus,
  stkPush,
  stkQuery,
} from "../../features/payment/paymentSlice";
import Feedback from "../Feedback";
import axios from "axios";

const PreviewCheckout = ({ mpesaNumber, setMpesaNumber }) => {
  const { paymentStatus, checkoutRequestID, stkQueryResultCode } = useSelector(
    (state) => state.payment
  );

  const dispatch = useDispatch();

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    loading: false,
    error: null,
    success: null,
  });
  const successTimerRef = useRef(null);
  const errorTimerRef = useRef(null);

  const [course, setCourse] = useState({});

  useEffect(() => {
    fetchCourse(apiUrl, courseId, setCourse);
  }, [courseId]);

  useEffect(() => {
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);

    if (feedback.success && !feedback.error) {
      successTimerRef.current = setTimeout(() => {
        setFeedback((prev) => ({ ...prev, success: null }));
      }, 2000);
    }

    if (feedback.error) {
      errorTimerRef.current = setTimeout(() => {
        setFeedback((prev) => ({
          ...prev,
          error: null,
          success: null,
          loading: false,
        }));
      }, 2000);
    }

    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, [feedback.success, feedback.error]);

  async function checkEnrollment() {
    try {
      setFeedback((prev) => ({ ...prev, loading: true }));
      const response = await axios.get(
        `${apiUrl}/v1/courses/${course._id}/enrollment-status`,
        { withCredentials: true }
      );

      // If already enrolled
      if (response.data.isEnrolled) {
        setFeedback((prev) => ({
          ...prev,
          loading: false,
          success: "You're already enrolled in this course!",
          error: null,
        }));
        successTimerRef.current = setTimeout(() => {
          navigate(`/course/${course._id}`);
        }, 2000);
        return true;
      }

      setFeedback((prev) => ({ ...prev, loading: false }));
      return false;
    } catch (error) {
      setFeedback((prev) => ({
        ...prev,
        loading: false,
        error:
          error.response?.data?.message || "Failed to check enrollment status",
        success: null,
      }));
      return false;
    }
  }

  useEffect(() => {
    if (checkoutRequestID) {
      const delay = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          dispatch(stkQuery({ reqId: checkoutRequestID, courseId }));
        }, 2000);

        timeoutRef.current = setTimeout(() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }, 120000);
      }, 2000);

      return () => {
        clearTimeout(delay);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
  }, [checkoutRequestID, dispatch, courseId]);

  useEffect(() => {
    if (stkQueryResultCode !== null) {
      if (stkQueryResultCode === "0") {
        // dispatch(clearCart());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [stkQueryResultCode]);

  const handleBackClick = () => {
    dispatch(resetPaymentStatus());
    dispatch(closePaymentModal());
    navigate("/home");
  };

  const handleProceedToPay = async (e) => {
    e.preventDefault();

    // Check if user is already enrolled before proceeding
    const isEnrolled = await checkEnrollment();

    if (!isEnrolled) {
      dispatch(stkPush({ phoneNumber: mpesaNumber, amount: course.price }));
    }
  };

  return (
    <div className="bg-[#F5F7FA]">
      {feedback.error && (
        <Feedback isSuccess={false} message={feedback.error} />
      )}
      {feedback.success && (
        <Feedback isSuccess={true} message={feedback.success} />
      )}

      <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden px-6">
        {/* Back button and header */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-[#0069AA] hover:text-[#005589] mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-[#333333]">Checkout</h1>
        </div>

        {/* Course summary */}
        <div className="mb-4 px-4 py-2 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold text-[#333333] mb-2">
            {course.title}
          </h2>
          <p className="text-lg font-medium text-[#0069AA]">
            {course.isFree ? "Free" : `KES ${course.price}`}
          </p>
        </div>

        {/* Payment method */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">
            Payment Method
          </h3>
          <div className="flex items-center gap-3 py-2 px-4 border border-gray-200 rounded-lg mb-4">
            <div className="w-10">
              <img src={mpesaIcon} alt="M" />
            </div>
            <span className="font-medium">MPESA</span>
          </div>
          {paymentStatus === "idle" && (
            <PhoneInput2
              mpesaNumber={mpesaNumber}
              setMpesaNumber={setMpesaNumber}
              handleBackClick={handleBackClick}
              handleProceedToPay={handleProceedToPay}
              isLoading={feedback.loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCheckout;
