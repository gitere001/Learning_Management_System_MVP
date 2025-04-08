import { ArrowLeft, Loader2, Phone } from "lucide-react";
// import PhoneInput from "./PhoneInput";
import { useDispatch, useSelector } from "react-redux";
import {
  closePaymentModal,
  resetPaymentStatus,
} from "../../features/payment/paymentSlice";
import { useState } from "react";
import PreviewCheckout from "../studentDashboard/PreviewCheckout";

function PaymentModal() {
  const [mobile, setMobile] = useState("");
  const { paymentStatus, error } = useSelector((state) => state.payment);

  const dispatch = useDispatch();

  function handleReturnHome() {
    dispatch(resetPaymentStatus());
    dispatch(closePaymentModal());
  }

  return (
    <div
      className={
        "bg-white pt-2  mt-[74px] rounded-2xl shadow-xl  w-full max-w-[300px] md:max-w-[500px]  mx-auto  transition-all duration-300 ease-in-out"
      }
    >
      <PreviewCheckout />

      <div className="flex flex-col gap-2.5 items-center">
        <div
          className={`w-full max-h-0 overflow-hidden opacity-0 invisible transition-all duration-400 ease-out ${
            paymentStatus === "idle" ? "max-h-[300px] opacity-100 visible" : ""
          }`}
        ></div>

        <div
          className={`flex flex-col gap-2.5 items-center max-h-0 overflow-hidden opacity-0 invisible transition-all duration-400 ease-out ${
            paymentStatus === "processing"
              ? "max-h-[300px] opacity-100 visible"
              : ""
          }`}
        >
          <Loader2 className="w-14 h-14 text-blue-600 animate-spin" />
          <h2 className="text-gray-900 font-semibold text-xl">
            Processing Payment...
          </h2>
          <p className="text-gray-600 text-center">
            Please wait while we initiate your payment
          </p>
        </div>

        <div
          className={`flex flex-col gap-2.5 items-center max-h-0 overflow-hidden opacity-0 invisible transition-all duration-400 ease-out ${
            paymentStatus === "request-sent"
              ? "max-h-[300px] opacity-100 visible"
              : ""
          }`}
        >
          <Phone className="w-14 h-14 text-blue-600" />
          <h2 className="text-gray-900 font-semibold text-xl">
            Payment request sent!
          </h2>
          <p className="text-gray-600 text-center">
            Please enter your M-Pesa PIN on phone {mobile}
          </p>
        </div>

        <div
          className={`flex flex-col gap-2.5 items-center max-h-0 overflow-hidden opacity-0 invisible transition-all duration-400 ease-out ${
            paymentStatus === "checking-payment"
              ? "max-h-[300px] opacity-100 visible"
              : ""
          }`}
        >
          <div className="w-15 h-15 mx-auto mb-5 relative">
            <svg
              className="w-full h-full text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="animate-[rotate-circle_2s_linear_infinite] origin-center"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="60"
                strokeDashoffset="0"
              />
              <path
                className="animate-[pulse_1s_ease-in-out_infinite_alternate]"
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="text-gray-900 font-semibold text-xl">
            Checking payment status...
          </h2>
          <p className="text-gray-600 text-center">
            Please wait while we verify your transaction
          </p>
        </div>

        <div
          className={`flex flex-col gap-2.5 items-center max-h-0 overflow-hidden opacity-0 invisible transition-all duration-400 ease-out ${
            paymentStatus === "payment-success"
              ? "max-h-[300px] opacity-100 visible"
              : ""
          }`}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-gray-900 font-semibold text-xl">
            Payment Successful!
          </h2>
          <p className="text-gray-600 text-center">
            Thank you for your purchase
          </p>
          <button
            className="text-blue-600 font-semibold bg-transparent border-none cursor-pointer transition-colors duration-200 ease-in-out hover:text-blue-800"
            onClick={() => handleReturnHome()}
          >
            Return to Home
          </button>
        </div>

        <div
          className={`flex flex-col gap-2.5 items-center max-h-0 overflow-hidden opacity-0 invisible transition-all duration-400 ease-out ${
            paymentStatus === "payment-failed"
              ? "max-h-[300px] opacity-100 visible"
              : ""
          }`}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-gray-900 font-semibold text-xl">
            Payment failed
          </h2>
          <p className="text-gray-600 text-center">{error}</p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium border-none cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-800"
            onClick={() => dispatch(resetPaymentStatus())}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
