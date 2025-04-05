import React, { useState } from "react";
import { handleOtpVerification, startOTPTimer } from "../../utils/otpUtils";
import { ChevronLeft } from "lucide-react";

function OTPModal({ handleNext, handleBack, formData }) {

  const [timer, setTimer] = useState(null);
  const [otpInput, setOtpInput] = useState(""); // OTP input field value
  const [error, setError] = useState("");

  // Handle OTP input change
  const handleInputChange = (e) => {
    setOtpInput(e.target.value);
  };

  // Handle OTP submission
  const handleSubmitOtp = () => {
    if (handleOtpVerification(otpInput)) {
      setError("");
      setOtpInput("")
      handleNext(); // Proceed to the next step
    } else {
      setError("Invalid OTP");
    }
  };

  // Handle "Didn’t receive OTP?" click
  const handleResendOTP = () => {
    if (timer === null) {
      startOTPTimer(setTimer); // Start the timer if it's not running
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0069AA]">Enter OTP</h2>
        <p className="text-[#666666] mt-2">
          A one-time password (OTP) has been sent to{" "}
          <span className="font-semibold">{formData.email}</span>. Please enter
          the OTP to proceed.
        </p>
      </div>
      <div>
        <label
          htmlFor="otp"
          className="block text-sm font-medium text-[#333333]"
        >
          OTP <span className="text-[#E32726]">*</span>
        </label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otpInput}
          onChange={handleInputChange}
          maxLength="4"
          className={`mt-1 input-field ${error ? "border-[#E32726]" : ""}`}
          placeholder="Enter OTP"
          required
        />
        {error && <p className="mt-1 text-sm text-[#E32726]">{error}</p>}
      </div>
      <div className="text-center">
        {timer !== null ? (
          <p className="text-sm text-[#666666]">Resend OTP in {timer}s</p>
        ) : (
          <button
            onClick={handleResendOTP}
            className="text-[#0069AA] hover:underline"
          >
            Didn't receive OTP? Resend
          </button>
        )}
      </div>
      <div className="flex gap-3">
        <button onClick={() => {handleBack(); setOtpInput("")}} className="flex-1 btn-outline">
          <ChevronLeft className="h-4 w-4 mr-1 inline" />
          Back
        </button>
        <button
          onClick={handleSubmitOtp}
          className={` btn-primary flex-1 ${
            otpInput.length !== 4 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={otpInput.length !== 4}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default OTPModal;
