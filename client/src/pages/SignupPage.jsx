import React, { useEffect, useRef, useState } from "react";

import EmailModal from "../components/Signup-components/EmailModal";
import PasswordModal from "../components/Signup-components/PasswordModal";
import PersonalDetails from "../components/Signup-components/PersonalDetails";
import Preferences from "../components/Signup-components/Preferences";
import FinalStep from "../components/Signup-components/FinalStep";
import OTPModal from "../components/Signup-components/OtpModal";
import { useLocation } from "react-router-dom";

const SignupForm = () => {
  const location = useLocation();
  const signupRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    interests: [],
    referralSource: "",
    otherInterest: "",
  });
  useEffect(()=>{
    const section = location.pathname.split("/")[1];
    if (section === "signup" && signupRef.current) {
      signupRef.current.scrollIntoView({ behavior: "smooth" });

    }
  }, [location])

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[0-9!@#$%^&*]/.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target;
      if (checkbox.checked) {
        setFormData((prev) => ({
          ...prev,
          interests: [...prev.interests, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          interests: prev.interests.filter((interest) => interest !== value),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear errors when user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateStep = (step) => {
    let isValid = true;
    const newErrors = { ...errors };

    switch (step) {
      case 1:
        if (!validateEmail(formData.email)) {
          newErrors.email = "Please enter a valid email address";
          isValid = false;
        }
        break;
      // case 2:
      //   break
      case 3:
        if (!validatePassword(formData.password)) {
          newErrors.password =
            "Password must be at least 8 characters with a number or symbol";
          isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
          isValid = false;
        }
        break;
      case 4:
        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };



  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const renderPasswordStrengthMeter = () => {
    const strength = calculatePasswordStrength(formData.password);
    return (
      <div className="mt-1">
        <div className="flex gap-1 h-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`flex-1 rounded-full ${
                level <= strength ? "bg-[#0069AA]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {strength < 2 && "Weak"}
          {strength >= 2 && strength < 4 && "Medium"}
          {strength >= 4 && "Strong"}
        </p>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmailModal
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            handleNext={handleNext}
            validateEmail={validateEmail}

          />
        );

      case 2:
        return (
          <OTPModal handleNext={handleNext} handleBack={handleBack} formData={formData}/>
        );
      case 3:
        return (
          <PasswordModal
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            renderPasswordStrengthMeter={renderPasswordStrengthMeter}
            handleBack={handleBack}
            handleNext={handleNext}
            validatePassword={validatePassword}

          />
        );

      case 4:
        return (
          <PersonalDetails
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );

      case 5:
        return (
			<Preferences
			formData={formData}
			handleInputChange={handleInputChange}
			handleBack={handleBack}
			handleNext={handleNext}
		  />

        );

      case 6:
        return (
         <FinalStep formData={formData} setFormData={setFormData}/>
        );

      default:
        return null;
    }
  };
  console.log("currentStep", currentStep);

  return (
    <div   ref={signupRef} className=" min-h-screen bg-[#F5F7FA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  step === currentStep
                    ? "bg-[#0069AA]"
                    : step < currentStep
                    ? "bg-[#0069AA] opacity-50"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default SignupForm;
