import React, { useState } from "react";
import logoImg from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GuestNavigation from "./NavbarComponents/GuestNavigation";
import StudentNavigation from "./NavbarComponents/StudentNavigation";

import MobileNavigation from "./NavbarComponents/MobileNavigation";
import { logoutUser } from "../features/auth/logoutSlice";
import {
  setNotAuthenicated,
  unsetRole,
} from "../features/auth/authorizationSlice";

function Navbar() {
  const { isAuthenticated, role } = useSelector((state) => state.authenication);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logOutUser = () => {
    dispatch(logoutUser());
    dispatch(setNotAuthenicated());
    dispatch(unsetRole());
    navigate("/login");
  };

  const handleHomeClick = () => {
    if (isAuthenticated && role === "student") {
      navigate("/home");
    } else if (!isAuthenticated) {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="w-40 cursor-pointer"
              src={logoImg}
              alt="logo"
              onClick={handleHomeClick}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated && <GuestNavigation />}
            {isAuthenticated && role === "student" && <StudentNavigation logOutUser={logOutUser}/>}

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
        <MobileNavigation

          onClose={() => setIsMenuOpen(false)}
          logOutUser={logOutUser}
        />
      )}
    </nav>
  );
}

export default Navbar;
