import React, { useState } from "react";
import logoImg from "../../assets/logo.png";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/logoutSlice";
import {
  setNotAuthenicated,
  unsetRole,
} from "../../features/auth/authorizationSlice";
import { Link } from "react-router-dom"; // Import Link

const Sidebar = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/admin-dashboard" },
    { id: "courses", label: "Courses", icon: BookOpen, to: "/admin-dashboard/course" },
    { id: "users", label: "Manage Users", icon: Users, to: "/admin-dashboard/users" },
    {
      id: "payments",
      label: "Payments & Transactions",
      icon: CreditCard,
      to: "/admin-dashboard/payments",
    },
    {
      id: "admin-account",
      label: "Admin Account",
      icon: Users,
      to: "/admin-dashboard/account",
    },
  ];

  const logOutUser = () => {
    dispatch(logoutUser());
    dispatch(setNotAuthenicated());
    dispatch(unsetRole());
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-white shadow-md transition-all duration-300 relative ${isCollapsed ? "w-[70px]" : "w-[250px]"} ${className}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <div className={`flex items-center ${isCollapsed ? "hidden" : ""}`}>
          <div className="flex items-center">
            <img className="w-40 cursor-pointer" src={logoImg} alt="logo" />
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-lms-text hover:text-lms-primary transition-colors"
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      <nav className="py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to} // Use 'to' prop from Link
                className={`flex items-center py-3 px-4 transition-colors ${activeLink === item.id ? "text-[#0069AA] bg-blue-50 border-r-4 border-lms-primary" : "text-lms-text hover:text-lms-primary hover:bg-blue-50"} ${isCollapsed ? "justify-center" : ""}`}
                onClick={() => setActiveLink(item.id)}
              >
                <item.icon size={20} />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div onClick={logOutUser} className="absolute bottom-0 w-full border-t p-4 ">
        <button

          className={`flex items-center cursor-pointer text-lms-text hover:text-[#E32726] transition-colors ${isCollapsed ? "justify-center" : ""}`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
