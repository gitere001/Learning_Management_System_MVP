export const startOTPTimer = (setTimer) => {
	let timeLeft = 30; // 30 seconds timer
	const interval = setInterval(() => {
	  if (timeLeft <= 0) {
		clearInterval(interval);
		setTimer(null);  // Stop the timer when it reaches 0
	  } else {
		setTimer(timeLeft);
		timeLeft -= 1;
	  }
	}, 1000);
  };
  export const handleOtpVerification = (inputOtp) => {
	
	const validOtp = "0000";

	return inputOtp === validOtp;
  };