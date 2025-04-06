import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ role, onBack }) => {
  return (
    <div className="space-y-6 w-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0069AA]">
          Login as {role === "student" ? "Student" : "Admin"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
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
          <button
            type="button"
            onClick={onBack}
            className="flex-1 btn-outline"
          >
            Back
          </button>
          <button type="submit" className="flex-1 btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;