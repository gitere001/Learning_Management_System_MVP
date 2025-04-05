import { ChevronLeft } from 'lucide-react'
import React from 'react'

export default function PersonalDetails({formData, handleInputChange, errors, handleBack, handleNext}) {
  return (
	<div className="space-y-6">
	<div className="text-center">
	  <h2 className="text-2xl font-bold text-[#0069AA]">
		Tell Us About Yourself
	  </h2>
	</div>
	<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
	  <div>
		<label
		  htmlFor="firstName"
		  className="block text-sm font-medium text-[#333333]"
		>
		  First Name <span className="text-[#E32726]">*</span>
		</label>
		<input
		  type="text"
		  id="firstName"
		  name="firstName"
		  value={formData.firstName}
		  onChange={handleInputChange}
		  className={`mt-1 input-field ${
			errors.firstName ? "border-[#E32726]" : ""
		  }`}
		  placeholder="Enter your first name"
		  required
		/>
		{errors.firstName && (
		  <p className="mt-1 text-sm text-[#E32726]">
			{errors.firstName}
		  </p>
		)}
	  </div>
	  <div>
		<label
		  htmlFor="middleName"
		  className="block text-sm font-medium text-[#333333]"
		>
		  Middle Name
		</label>
		<input
		  type="text"
		  id="middleName"
		  name="middleName"
		  value={formData.middleName}
		  onChange={handleInputChange}
		  className="mt-1 input-field"
		  placeholder="Optional"
		/>
	  </div>
	</div>
	<div>
	  <label
		htmlFor="lastName"
		className="block text-sm font-medium text-[#333333]"
	  >
		Last Name <span className="text-[#E32726]">*</span>
	  </label>
	  <input
		type="text"
		id="lastName"
		name="lastName"
		value={formData.lastName}
		onChange={handleInputChange}
		className={`mt-1 input-field ${
		  errors.lastName ? "border-[#E32726]" : ""
		}`}
		placeholder="Enter your last name"
		required
	  />
	  {errors.lastName && (
		<p className="mt-1 text-sm text-[#E32726]">{errors.lastName}</p>
	  )}
	</div>
	<div>
	  <label
		htmlFor="gender"
		className="block text-sm font-medium text-[#333333]"
	  >
		Gender
	  </label>
	  <select
		id="gender"
		name="gender"
		value={formData.gender}
		onChange={handleInputChange}
		className="mt-1 input-field"
	  >
		<option value="">Select gender</option>
		<option value="male">Male</option>
		<option value="female">Female</option>
		<option value="non-binary">Non-binary</option>
		<option value="prefer-not-to-say">Prefer not to say</option>
	  </select>
	</div>
	<div className="flex gap-4">
	  <button onClick={handleBack} className="flex-1 btn-outline">
		<ChevronLeft className="h-4 w-4 mr-1 inline" />
		Back
	  </button>
	  <button
		onClick={handleNext}
		disabled={!formData.firstName || !formData.lastName}
		className={`flex-1 btn-primary ${
		  !formData.firstName || !formData.lastName
			? "opacity-50 cursor-not-allowed"
			: ""
		}`}
	  >
		Next
	  </button>
	</div>
  </div>
  )
}
