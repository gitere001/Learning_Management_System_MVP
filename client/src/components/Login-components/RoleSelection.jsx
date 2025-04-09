import React from "react";
import { GraduationCap, UserCog } from "lucide-react";
import { Link } from "react-router-dom";


const RoleSelection = ({ onSelectRole, loginRef }) => {

  return (
    <div ref={loginRef} className="text-center space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0069AA]">
          Login to Digital Africa LMS
        </h1>
        <p className="mt-2 text-gray-600">
          Please select your role to continue
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelectRole("student")}
          className="flex flex-col items-center p-6   border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
        >
          <div className="h-16 w-16  bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Student</h3>
          <p className="mt-2 text-sm text-gray-500">
            Access your learning materials
          </p>
        </button>

        <button
          onClick={() => onSelectRole("admin")}
          className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
        >
          <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <UserCog className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Admin</h3>
          <p className="mt-2 text-sm text-gray-500">Manage the platform</p>
        </button>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="font-medium text-[#0069AA] hover:text-[#005589]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
