import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stkPush, stkQuery } from "../../features/payment/paymentSlice";

function PhoneInput2({ courseTotal }) {



  const dispatch = useDispatch();
  const [mpesaNumber, setMpesaNumber] = useState("");
  const handleProceedToPay = (e) => {
    e.preventDefault();
    dispatch(stkPush({ phoneNumber: mpesaNumber, amount: courseTotal }));
  };


  return (
    <>
      <div className=" mb-2">
        <label
          htmlFor="mpesa-number"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter your MPESA number
        </label>
        <input
          type="tel"
          id="mpesa-number"
          className="input-field"
          placeholder="07XXXXXXXX or 01XXXXXX"
          value={mpesaNumber}
          onChange={(e) => setMpesaNumber(e.target.value)}
        />
        <p className="mt-2 text-sm text-gray-500">
          You'll receive a payment request on this number
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="lms-button-accent flex-1 py-3">Cancel</button>
        <button
          onClick={handleProceedToPay}
          className="lms-button-primary flex-1 py-3"
        >
          Proceed to Pay
        </button>
      </div>
    </>
  );
}

export default PhoneInput2;
