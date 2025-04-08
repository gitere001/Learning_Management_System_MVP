import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mpesaIcon from "../../assets/mpesa-icon.png";
import { fetchCourse } from "../../utils/fetchCourse";
const apiUrl = import.meta.env.VITE_API_URL;
import PhoneInput2 from "../PaymentModals/phoneInput2";
import { useDispatch, useSelector } from "react-redux";
import { stkQuery } from "../../features/payment/paymentSlice";

const PreviewCheckout = () => {
  const { paymentStatus, checkoutRequestID, stkQueryResultCode } = useSelector(
    (state) => state.payment
  );

  console.log("checkoutRequestID: ", checkoutRequestID);
  const dispatch = useDispatch();

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  useEffect(() => {
    fetchCourse(apiUrl, courseId, setCourse);
  }, [courseId]);

  useEffect(() => {
    if (checkoutRequestID) {
      const delay = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          dispatch(stkQuery({ reqId: checkoutRequestID }));
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
  }, [checkoutRequestID, dispatch]);

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
    navigate(-1); // Go back to previous page
  };

  const handleCancel = () => {
    navigate("/courses"); // Redirect to courses page
  };

  return (
    <div className=" bg-[#F5F7FA]">
      <div className="max-w-2xl mx-auto bg-white rounded-xl  overflow-hidden px-6">
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
            <PhoneInput2 courseTotal={course.price} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCheckout;
