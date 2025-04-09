import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpenCheck,
  BarChart3,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function MobileNavigation({ onClose, logOutUser }) {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector((state) => state.authenication);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        style={{ top: "64px" }}
      ></div>
      <div className="md:hidden bg-white relative z-50 border-t border-gray-50">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={() => {
              if (isAuthenticated && role === "student") {
                handleNavigation("/home");
              } else if (!isAuthenticated) {
                handleNavigation("/");
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full text-left px-3 py-2 text-[#333333] hover:text-[#0069AA] flex items-center"
          >
            {isAuthenticated && <Home className="w-4 h-4 mr-2" />}
            Home
          </button>

          {isAuthenticated ? (
            role === "student" ? (
              <>
                <Link
                  to="/home/my-courses"
                  onClick={onClose}
                  className="px-3 py-2 text-[#333333] hover:text-[#0069AA] flex items-center"
                >
                  <BookOpenCheck className="w-4 h-4 mr-2" />
                  My Courses
                </Link>
                <Link
                  to="/reports"
                  onClick={onClose}
                  className="px-3 py-2 text-[#333333] hover:text-[#0069AA] flex items-center"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reports
                </Link>
                <Link
                  to="/notifications"
                  onClick={onClose}
                  className="px-3 py-2 text-[#333333] hover:text-[#0069AA] flex items-center"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Link>
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={() => handleNavigation("/home/profiles")}
                    className="w-full text-left px-3 py-2 text-[#333333] hover:text-[#0069AA] flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      logOutUser();
                    }}
                    className="w-full text-left px-3 py-2 text-red-600 hover:text-red-800 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : null
          ) : (
            <>
              <Link
                to="/about"
                onClick={onClose}
                className="block px-3 py-2 text-[#333333] hover:text-[#0069AA]"
              >
                About
              </Link>
              <Link
                to="/featured-courses"
                onClick={onClose}
                className="block px-3 py-2 text-[#333333] hover:text-[#0069AA]"
              >
                Featured Courses
              </Link>
              <Link
                to="/contact-us"
                onClick={onClose}
                className="block px-3 py-2 text-[#333333] hover:text-[#0069AA]"
              >
                Contact-Us
              </Link>
              <div className="px-3 py-2 space-y-2">
                <button
                  onClick={() => handleNavigation("/login")}
                  className="w-full btn-outline"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("/signup")}
                  className="w-full btn-primary"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
