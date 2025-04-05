import { Globe2, GraduationCap, Users } from 'lucide-react'
import React from 'react'

function About() {
  return (

	 <section id='about' className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
	 <div className="max-w-7xl mx-auto">
	   <div className="text-center mb-12">
		 <h2 className="text-3xl font-bold text-[#0069AA] mb-4">Why Choose Digital 4 Africa?</h2>
		 <p className="text-lg text-[#333333] max-w-3xl mx-auto">
		   We're committed to empowering Africa's digital future through accessible, quality education that bridges the skills gap and creates opportunities.
		 </p>
	   </div>

	   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
		 <div className="text-center p-6">
		   <div className="bg-[#F5F7FA] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
			 <GraduationCap className="h-8 w-8 text-[#0069AA]" />
		   </div>
		   <h3 className="text-xl font-semibold text-[#333333] mb-2">Quality Education</h3>
		   <p className="text-[#333333]">Industry-aligned curriculum designed by experts with practical, hands-on learning experiences.</p>
		 </div>

		 <div className="text-center p-6">
		   <div className="bg-[#F5F7FA] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
			 <Users className="h-8 w-8 text-[#0069AA]" />
		   </div>
		   <h3 className="text-xl font-semibold text-[#333333] mb-2">Community Support</h3>
		   <p className="text-[#333333]">Join a thriving community of learners and mentors who support your growth journey.</p>
		 </div>

		 <div className="text-center p-6">
		   <div className="bg-[#F5F7FA] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
			 <Globe2 className="h-8 w-8 text-[#0069AA]" />
		   </div>
		   <h3 className="text-xl font-semibold text-[#333333] mb-2">African Focus</h3>
		   <p className="text-[#333333]">Content tailored to African markets and opportunities, with local case studies and examples.</p>
		 </div>
	   </div>
	 </div>
   </section>
  )
}

export default About