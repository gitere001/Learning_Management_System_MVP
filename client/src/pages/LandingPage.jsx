import React, { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import FeaturedCourse from "../components/FeaturedCourse";
import ContactForm from "../components/ContactForm";
import { useLocation } from "react-router-dom";

function LandingPage() {
  const location = useLocation();
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const featuredRef = useRef(null);
  const contactRef = useRef(null);
  useEffect(() => {
    // Extract the section from the URL path
    const section = location.pathname.split("/")[1];
    console.log(section);

    // Scroll to the appropriate section based on the URL
    if (section === "about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "featured-courses" && featuredRef.current) {
      featuredRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "contact-us" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "" && heroRef.current) {
		window.scrollTo({ top: 0, behavior: "smooth" });
    //   heroRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <section ref={heroRef}>
      <Hero />
      <About ref={aboutRef} />
      <FeaturedCourse ref={featuredRef} />
      <ContactForm ref={contactRef} />
    </section>
  );
}

export default LandingPage;
