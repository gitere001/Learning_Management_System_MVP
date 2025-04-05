import {
  BookOpen,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";
import logoImg from '../assets/logo.png'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center">
              <img className="w-30" src={logoImg} alt="logo" />
            </div>
            <p className="text-[#333333] mb-4">
              Empowering Africa's digital transformation through quality
              education and practical skills development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#0069AA] hover:text-[#005589]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#0069AA] hover:text-[#005589]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#0069AA] hover:text-[#005589]">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#0069AA] hover:text-[#005589]">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#333333] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={"/about"} className="text-[#333333] hover:text-[#0069AA]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={"/featured-courses"} className="text-[#333333] hover:text-[#0069AA]">
                  Our Courses
                </Link>
              </li>
              <li>
                <Link to={"/contact-us"} className="text-[#333333] hover:text-[#0069AA]">
                  Become an Instructor
                </Link>
              </li>
              <li>
                <Link to={"/contact-us"} className="text-[#333333] hover:text-[#0069AA]">
                  Career Support
                </Link>
              </li>
              <li>
                <Link to={"/success-stories"} className="text-[#333333] hover:text-[#0069AA]">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#333333] mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={"/contact-us"} className="text-[#333333] hover:text-[#0069AA]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to={'/frequent-questions'} className="text-[#333333] hover:text-[#0069AA]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to={"/contact-us"} className="text-[#333333] hover:text-[#0069AA]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to={"/pricacy-policies"} className="text-[#333333] hover:text-[#0069AA]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={'terms-of-service'} className="text-[#333333] hover:text-[#0069AA]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#333333] mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-[#0069AA] mr-2" />
                <span className="text-[#333333]">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#0069AA] mr-2" />
                <span className="text-[#333333]">+254 700 000000</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#0069AA] mr-2" />
                <span className="text-[#333333]">
                  info@digitalforafrica.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-[#333333]">
            © {new Date().getFullYear()} Digital 4 Africa LMS. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
