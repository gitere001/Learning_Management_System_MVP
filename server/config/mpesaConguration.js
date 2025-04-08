// File: server/config/mpesa.js
const mpesaEnv = process.env.MPESA_ENV || "sandbox";
export const MPESA_BASE_URL = mpesaEnv === "live"
  ? "https://api.safaricom.co.ke"
  : "https://sandbox.safaricom.co.ke";
