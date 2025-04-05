import React from 'react'
import { Link } from 'react-router-dom';

function EmailModal({formData, handleInputChange, errors, handleNext, validateEmail}) {

  return (
	<div className="space-y-6">
	<div className="text-center">
	  <h2 className="text-2xl font-bold text-[#0069AA]">Create Your Account for Digital 4 Africa LMS</h2>
	  <p className="text-[#666666] mt-2">We'll use your email for account access and course certificates. We never spam.</p>
	</div>
	<div>
	  <label htmlFor="email" className="block text-sm font-medium text-[#333333]">
		Email address <span className="text-[#E32726]">*</span>
	  </label>
	  <input
		type="email"
		id="email"
		name="email"
		value={formData.email}
		onChange={handleInputChange}
		className={`mt-1 input-field ${errors.email ? 'border-[#E32726]' : ''}`}
		placeholder="Enter your email"
		required
	  />
	  {errors.email && <p className="mt-1 text-sm text-[#E32726]">{errors.email}</p>}
	</div>
	<button
	  onClick={handleNext}
	  disabled={!validateEmail(formData.email)}
	  className={`w-full btn-primary ${!validateEmail(formData.email) ? 'opacity-50 cursor-not-allowed' : ''}`}
	>
	  Next
	</button>
	<div className="mt-4 text-center">
        <p className="text-sm text-[#333333]">
          Already registered? <Link to={"/login"} className="text-[#0069AA] hover:underline">Login here</Link>
        </p>
      </div>
  </div>
  )
}

export default EmailModal