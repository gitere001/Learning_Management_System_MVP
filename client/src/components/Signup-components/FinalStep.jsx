import { Check } from 'lucide-react'
import React from 'react'

function FinalStep({formData, handleSubmit}) {
  return (
	<div className="text-center space-y-6">
	<div className="w-16 h-16 bg-[#0069AA] rounded-full flex items-center justify-center mx-auto">
	  <Check className="h-8 w-8 text-white" />
	</div>
	<div>
	  <h2 className="text-2xl font-bold text-[#0069AA]">
		Welcome, {formData.firstName}! 🎓
	  </h2>
	  <p className="text-[#666666] mt-2">
		Your account is ready. Start exploring courses!
	  </p>
	</div>
	<button onClick={handleSubmit} className="btn-primary">
	  Go to Login
	</button>
  </div>
  )
}

export default FinalStep