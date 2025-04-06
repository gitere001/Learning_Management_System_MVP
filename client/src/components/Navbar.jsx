import React, { useState } from "react";
import logoImg from "../assets/logo.png";
import { Menu, X, Bell, BookOpenCheck, LayoutDashboard, User, LogOut, BarChart3, Home } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { loading, error, isAuthenticated, role } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function hideMobileMenu() {
    setIsMenuOpen(false);
  }

  const handleHomeClick = () => {
    if (isAuthenticated && role==="student") {
      navigate("/home")

    }
    if (!isAuthenticated) {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img className="w-40" src={logoImg} alt="logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleHomeClick}
              className="text-[#333333] hover:text-[#0069AA] transition-colors flex items-center"
            >
              <Home className="inline w-4 h-4 mr-1" />
              Home
            </button>

            {isAuthenticated && role === "student" ? (
              <>
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
                <div className="relative group ">
                  <button className="text-[#333333] hover:text-[#0069AA] transition-colors flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Profile
                  </button>
                  <div className="absolute right-0 mt-5 w-40 bg-white shadow-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button onClick={()=> navigate("/my-account")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Account
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
                      <LogOut className="inline w-4 h-4 mr-1" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/about" className="text-[#333333] hover:text-[#0069AA] transition-colors">
                  About
                </Link>
                <Link to="/featured-courses" className="text-[#333333] hover:text-[#0069AA] transition-colors">
                  Featured-Courses
                </Link>
                <Link to="/contact-us" className="text-[#333333] hover:text-[#0069AA] transition-colors">
                  Contact-Us
                </Link>
                <button onClick={() => navigate("/login")} className="btn-outline">
                  Login
                </button>
                <button onClick={() => navigate("/signup")} className="btn-primary">
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 cursor-pointer text-[#333333]" />
              ) : (
                <Menu className="h-6 w-6 cursor-pointer text-[#333333]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={hideMobileMenu}
            style={{ top: "64px" }}
          ></div>
          <div className="md:hidden bg-white relative z-50 border-t border-gray-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  handleHomeClick();
                  hideMobileMenu();
                }}
                className="block w-full text-left px-3 py-2 text-[#333333] hover:text-[#0069AA]"
              >
                Home
              </button>

              {isAuthenticated && role === "student" ? (
                <>
                  <Link to="/my-courses" onClick={hideMobileMenu} className="block px-3 py-2 text-[#333333] hover:text-[#0069AA]">
                    My Courses
                  </Link>
                  <Link to="/reports" onClick={hideMobileMenu} className="block px-3 py-2 text-[#333333] hover:text-[#0069AA]">
                    Reports
                  </Link>
                  <Link to="/notifications" onClick={hideMobileMenu} className="block px-3 py-2 text-[#333333] hover:text-[#0069AA]">
                    Notifications
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button className="block w-full text-left px-3 py-2 text-[#333333] hover:text-[#0069AA]">
                      Account
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-800">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/about" onClick={hideMobileMenu} className="block px-3 py-2 text-[#333333] hover:text-[#0069AA]">
                    About
                  </Link>
                  <Link to="/featured-courses" onClick={hideMobileMenu} className="block px-3 py-2 text-[#333333] hover:text-[#0069AA]">
                    Featured Courses
                  </Link>
                  <Link to="/contact-us" onClick={hideMobileMenu} className="block px-3 py-2 text-[#333333] hover:text-[#0069AA]">
                    Contact-Us
                  </Link>
                  <div className="px-3 py-2 space-y-2">
                    <button
                      onClick={() => {
                        hideMobileMenu();
                        navigate("/login");
                      }}
                      className="w-full btn-outline"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        hideMobileMenu();
                        navigate("/signup");
                      }}
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
      )}
    </nav>
  );
}

export default Navbar;
