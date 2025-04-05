import React from "react";
import heroImage from "../assets/hero-image.png";


function Hero() {
  return (
    <section  className="bg-[#182042] py-16 px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center mt-[8vh]">
      {/* Left Content */}
      <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Learn Skills for Your Digital Future
        </h1>
        <p className="text-lg opacity-90 mb-8 max-w-lg">
          Access a variety of online courses and enhance your digital expertise
          on our platform.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-3 bg-[#F0B93B] text-[#182042] font-bold rounded-md hover:bg-[#e6ad2e] transition-colors">
            Get Started
          </button>
          <button
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="lg:w-1/2 flex justify-center">
        <div className=" rounded-md p-6 w-full max-w-md">
          <img
            src={heroImage}
            alt="Person learning digital skills"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
