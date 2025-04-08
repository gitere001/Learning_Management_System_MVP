// File: server/middleware/mpesaAuth.js
import axios from 'axios';
import { MPESA_BASE_URL } from '../config/mpesaConguration.js';

export const mpesaTokenGenerate = async (req, res, next) => {
  try {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const resp = await axios.get(
      `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    );
	console.log(resp.data.access_token);

    req.token = resp.data.access_token;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
