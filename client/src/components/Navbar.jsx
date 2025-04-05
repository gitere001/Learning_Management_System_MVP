import React, { useState } from 'react'
import logoImg from '../assets/logo.png'
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



function Navbar() {
  const navigate = useNavigate()
  // State for mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function hideMobileMenu() {
    setIsMenuOpen(false)
  }
  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img className='w-60' src={logoImg} alt="logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a onClick={()=> handleHomeClick()}  className="text-[#333333] hover:text-[#0069AA] transition-colors">Home</a>
            <a href="#about" className="text-[#333333] hover:text-[#0069AA] transition-colors">About</a>
            <a href="#featured-courses" className="text-[#333333] hover:text-[#0069AA] transition-colors">Featured-Courses</a>
            <a href="#contactUs" className="text-[#333333] hover:text-[#0069AA] transition-colors">Contact-Us</a>
            <button onClick={()=> {navigate('/login')}} className="btn-outline">Login</button>
            <button onClick={()=> navigate('/signup')} className="btn-primary">Sign Up</button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#333333]" />
              ) : (
                <Menu className="h-6 w-6 text-[#333333]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a  onClick={() => {handleHomeClick(); hideMobileMenu()}} className="block px-3 py-2 text-[#333333] hover:text-[#0069AA] transition-colors">Home</a>
            <a href='#about' className="block px-3 py-2 text-[#333333] hover:text-[#0069AA] transition-colors">About</a>
            <a href="#featured-courses" onClick={hideMobileMenu} className="block px-3 py-2 text-[#333333] hover:text-[#0069AA] transition-colors">Featured Courses</a>
            <a href="#contactUs" onClick={hideMobileMenu} className="block px-3 py-2 text-[#333333] hover:text-[#0069AA] transition-colors">Contact-Us</a>
            <div className="px-3 py-2 space-y-2">
              <button onClick={()=> {hideMobileMenu(); navigate('/login')}} className="w-full btn-outline">Login</button>
              <button onClick={()=> {hideMobileMenu(); navigate('/signup')}} className="w-full btn-primary">Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;
