import { Link, useNavigate } from "react-router-dom";
import { BookOpenCheck, BarChart3, Bell, User, LogOut, Home } from "lucide-react";

export default function StudentNavigation({logOutUser}) {
  const navigate = useNavigate();

  return (
    <>
      <Link to="/home" className="text-[#333333] hover:text-[#0069AA] transition-colors flex items-center">
        <Home className="inline w-4 h-4 mr-1" />
        Home
      </Link>
      <Link to="/my-courses" className="text-[#333333] hover:text-[#0069AA] transition-colors">
        <BookOpenCheck className="inline w-4 h-4 mr-1" />
        My Courses
      </Link>
      <Link to="/reports" className="text-[#333333] hover:text-[#0069AA] transition-colors">
        <BarChart3 className="inline w-4 h-4 mr-1" />
        Reports
      </Link>
      <Link to="/notifications" className="text-[#333333] hover:text-[#0069AA] transition-colors">
        <Bell className="inline w-4 h-4 mr-1" />
        Notifications
      </Link>
      <div className="relative group">
        <button className="text-[#333333] hover:text-[#0069AA] transition-colors flex items-center">
          <User className="w-4 h-4 mr-1" />
          Profile
        </button>
        <div className="absolute right-0 mt-5 w-40 bg-white shadow-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => navigate("/my-account")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Account
          </button>
          <button onClick={logOutUser} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
            <LogOut className="inline w-4 h-4 mr-1" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}