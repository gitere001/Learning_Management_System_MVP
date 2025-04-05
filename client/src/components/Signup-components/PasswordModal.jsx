import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import React from "react";

function PasswordModal({
  showPassword,
  formData,
  handleInputChange,
  errors,
  setShowPassword,
  renderPasswordStrengthMeter,
  showConfirmPassword,
  setShowConfirmPassword,
  handleBack,
  handleNext,
  validatePassword,
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0069AA]">
          Secure Your Account
        </h2>
        <p className="text-[#666666] mt-2">
          Use 8+ characters with a number or symbol.
        </p>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#333333]"
        >
          Password <span className="text-[#E32726]">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`mt-1 input-field pr-10 ${
              errors.password ? "border-[#E32726]" : ""
            }`}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {renderPasswordStrengthMeter()}
        {errors.password && (
          <p className="mt-1 text-sm text-[#E32726]">{errors.password}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-[#333333]"
        >
          Confirm Password <span className="text-[#E32726]">*</span>
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`mt-1 input-field pr-10 ${
              errors.confirmPassword ? "border-[#E32726]" : ""
            }`}
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-[#E32726]">
            {errors.confirmPassword}
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <button onClick={handleBack} className="flex-1 btn-outline">
          <ChevronLeft className="h-4 w-4 mr-1 inline" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={
            !validatePassword(formData.password) ||
            formData.password !== formData.confirmPassword
          }
          className={`flex-1 btn-primary ${
            !validatePassword(formData.password) ||
            formData.password !== formData.confirmPassword
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PasswordModal;
