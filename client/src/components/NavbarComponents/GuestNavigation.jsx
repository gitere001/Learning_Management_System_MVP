import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GuestNavigation() {
  const navigate = useNavigate();

  return (
    <>
	 <Link to="/" className="text-[#333333] hover:text-[#0069AA] transition-colors flex items-center">
        {/* <Home className="inline w-4 h-4 mr-1" /> */}
        Home
      </Link>
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
  );
}