import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import FeaturedCourse from '../components/FeaturedCourse'
import ContactForm from '../components/ContactForm'

function LandingPage() {
  return (
	<>
	<Hero/>
	<About/>
	<FeaturedCourse/>
	<ContactForm/>
	</>
  )
}

export default LandingPage