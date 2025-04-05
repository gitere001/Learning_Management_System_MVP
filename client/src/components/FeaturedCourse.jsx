import { ChevronRight } from 'lucide-react'
import React from 'react'

function FeaturedCourse() {
  return (
	<section id='featured-courses' className="py-16 px-4 sm:px-6 lg:px-8">
	<div className="max-w-7xl mx-auto">
	  <h2 className="text-3xl font-bold text-[#0069AA] mb-8 text-center">Featured Courses</h2>
	  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{[
		  {
			title: "Graphic Design Fundamentals",
			price: "KES 2,999",
			image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=500",
		  },
		  {
			title: "Digital Marketing Mastery",
			price: "KES 3,499",
			image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=500",
		  },
		  {
			title: "Web Development Bootcamp",
			price: "KES 4,999",
			image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=500",
		  },
		].map((course, index) => (
		  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
			<img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
			<div className="p-6">
			  <h3 className="text-xl font-semibold text-[#333333] mb-2">{course.title}</h3>
			  <p className="text-[#E32726] font-bold mb-4">{course.price}</p>
			  <button className="w-full btn-primary">
				Enroll Now <ChevronRight className="inline-block ml-1 h-4 w-4" />
			  </button>
			</div>
		  </div>
		))}
	  </div>
	</div>
  </section>
  )
}

export default FeaturedCourse