import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetLoginState } from "../../features/auth/loginSlice";
import Feedback from "../Feedback";

const LoginForm = ({ role, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error,  isAuthenticated } = useSelector(
    (state) => state.userLogin
  );

  // Use useRef to keep track of timers
  const successTimerRef = useRef(null);
  const errorTimerRef = useRef(null);

  useEffect(() => {
    // Clear any existing timers first
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);

    // Handle successful login
    if (isAuthenticated && !error) {
      successTimerRef.current = setTimeout(() => {
        dispatch(resetLoginState());
        navigate('/home');
      }, 2000);
    }

    // Handle error display
    if (error) {
      errorTimerRef.current = setTimeout(() => {
        dispatch(resetLoginState()); // Reset the error state after 2 seconds
      }, 2000);
    }

    // Clean up function to clear timeouts when component unmounts
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, [dispatch, isAuthenticated, error, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(loginUser({ ...formData, role }));
    }
  };

  return (
    <div className="space-y-6 w-full relative">
      {error ? (
        <Feedback isSuccess={false} message={error} />
      ) : isAuthenticated ? (
        <Feedback isSuccess={true} message={"Successful Login"} />
      ) : null}

      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0069AA]">
          Login as {role === "student" ? "Student" : "Admin"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="space-y-4 relative" onSubmit={handleLogin}>
        <div className="relative mb-7">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email ? "border-[#E32726]" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <small className="absolute text-[#E32726] text-xs mt-1 left-0">
              {errors.email}
            </small>
          )}
        </div>

        <div className="relative mb-7">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.password ? "border-[#E32726]" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <small className="absolute text-[#E32726] text-xs mt-1 left-0">
              {errors.password}
            </small>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to={"/password-reset"}
              className="font-medium text-[#0069AA] hover:text-[#005589]"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={onBack} className="flex-1 btn-outline">
            Back
          </button>
          <button type="submit" className="flex-1 btn-primary">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;