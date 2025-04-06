import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Feedback = ({ isSuccess, message }) => {
  return (
    <div
      className={`flex items-center gap-2 p-4 rounded-lg border w-max absolute top-5 left-1/2 transform -translate-x-1/2 ${
        isSuccess
          ? 'bg-green-50 border-green-200 text-green-800'
          : 'bg-red-50 border-red-200 text-red-800'
      } transition-all duration-300 ease-in-out`}
    >
      <div
        className={`flex-shrink-0 ${
          isSuccess ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isSuccess ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
      </div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Feedback;
