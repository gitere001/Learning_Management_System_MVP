import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkEmail, clearEmailState } from "../../features/auth/emailCheckSlice";
import Feedback from "../Feedback";

function EmailModal({
  formData,
  handleInputChange,
  errors,
  handleNext,
  validateEmail,
}) {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.emailCheck);
  function handleCheckEmail() {
	dispatch(checkEmail(formData.email))
  }
  useEffect(() => {
	if (message === "New user" && !error) {
	  dispatch(clearEmailState());
	  handleNext();
	}

	// Handle error display for 2 seconds
	if (error) {
	  const timer = setTimeout(() => {
		dispatch(clearEmailState()); // Reset the error state after 2 seconds
	  }, 2000);

	  // Clear the timeout if the component unmounts or error is resolved
	  return () => clearTimeout(timer);
	}
  }, [dispatch, message, error]);



  return (
    <section className="space-y-6 relative">
		{error && <Feedback isSuccess={message === "New user" && !error} message={error}/>}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0069AA]">
          Create Your Account for Digital 4 Africa LMS
        </h2>
        <p className="text-[#666666] mt-2">
          We'll use your email for account access and course certificates. We
          never spam.
        </p>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#333333]"
        >
          Email address <span className="text-[#E32726]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`mt-1 input-field ${
            errors.email ? "border-[#E32726]" : ""
          }`}
          placeholder="Enter your email"
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-[#E32726]">{errors.email}</p>
        )}
      </div>
      <button
        onClick={handleCheckEmail}
        disabled={!validateEmail(formData.email)}
        className={`w-full btn-primary ${
          !validateEmail(formData.email) ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Checking Email..." : "Next"}
      </button>
      <div className="mt-4 text-center">
        <p className="text-sm text-[#333333]">
          Already registered?{" "}
          <Link to={"/login"} className="text-[#0069AA] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default EmailModal;
