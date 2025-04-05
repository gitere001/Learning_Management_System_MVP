import { ChevronLeft } from 'lucide-react'
import React from 'react'

function Preferences({formData, handleInputChange, handleBack, handleNext}) {
  return (
	<div className="space-y-6">
	<div className="text-center">
	  <h2 className="text-2xl font-bold text-[#0069AA]">
		Help Us Personalize Your Learning
	  </h2>
	</div>
	<div>
	  <p className="block text-sm font-medium text-[#333333] mb-3">
		Which topics interest you?
	  </p>
	  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
		{[
		  "Graphic Design",
		  "Digital Marketing",
		  "Web Development",
		  "Data Science",
		  "Other",
		].map((interest) => (
		  <label key={interest} className="flex items-center space-x-3">
			<input
			  type="checkbox"
			  name="interests"
			  value={interest}
			  checked={formData.interests.includes(interest)}
			  onChange={handleInputChange}
			  className="h-4 w-4 text-[#0069AA] border-gray-300 rounded focus:ring-[#0069AA]"
			/>
			<span className="text-[#333333]">{interest}</span>
		  </label>
		))}
	  </div>
	  {formData.interests.includes("Other") && (
		<input
		  type="text"
		  name="otherInterest"
		  value={formData.otherInterest || ""}
		  onChange={handleInputChange}
		  className="mt-3 input-field"
		  placeholder="Please specify"
		/>
	  )}
	</div>
	<div>
	  <label
		htmlFor="referralSource"
		className="block text-sm font-medium text-[#333333]"
	  >
		How did you hear about us?
	  </label>
	  <select
		id="referralSource"
		name="referralSource"
		value={formData.referralSource}
		onChange={handleInputChange}
		className="mt-1 input-field"
	  >
		<option value="">Select an option</option>
		<option value="social-media">Social Media</option>
		<option value="friend-referral">Friend Referral</option>
		<option value="google">Google</option>
		<option value="email">Email</option>
		<option value="other">Other</option>
	  </select>
	</div>
	<div className="flex gap-4">
	  <button onClick={handleBack} className="flex-1 btn-outline">
		<ChevronLeft className="h-4 w-4 mr-1 inline" />
		Back
	  </button>
	  <button onClick={handleNext} className="flex-1 btn-primary">
		Finish
	  </button>
	</div>
  </div>
  )
}

export default Preferences