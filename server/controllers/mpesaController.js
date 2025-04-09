// File: server/controllers/mpesaController.js
import axios from 'axios';
import { MPESA_BASE_URL } from '../config/mpesaConguration.js';
import EnrolledCourse from '../models/enrolledCourse.model.js'

import { generateTimestamp, generatePassword } from '../utils/mpesaHelpers.js';

export const home = (req, res) => {
  res.send("Hello world");
};

export const stkPush = async (req, res) => {
  console.log(req.token);
  const { phoneNumber, amount } = req.body;
  const formattedPhone = `254${phoneNumber.slice(-9)}`;

  try {
    const timestamp = generateTimestamp();
    const password = generatePassword(timestamp);

    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", // or "CustomerBuyGoodsOnline" for tills
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: process.env.MPESA_SHORTCODE, // or till number
        PhoneNumber: formattedPhone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: phoneNumber,
        TransactionDesc: "anything here",
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    return res.status(200).json({
      message: `stk sent succefully to ${phoneNumber}`,
      data: {
        MerchantRequestID: response.data.MerchantRequestID,
        CheckoutRequestID: response.data.CheckoutRequestID,
        ResponseDescription: response.data.ResponseDescription,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const stkQuery = async (req, res) => {
  const { reqId, courseId } = req.body;
  console.log("courseid", courseId);
  const user = req.user
  console.log(user);

  if (!reqId) {
    return res.status(400).json({ error: "Missing CheckoutRequestID" });
  }

  try {
    const timestamp = generateTimestamp();
    const password = generatePassword(timestamp);

    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpushquery/v1/query`,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: reqId,
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    console.log(response.data);

    // Check if payment was successful
    if (response.data.ResultCode === "0") {
      console.log(response.data);
      console.log("Payment successful, attempting enrollment...");
      // Payment was successful - enroll the user in the course
      const enrolledCourse = new EnrolledCourse({
        userId: user._id,
        courseId: courseId,
        status: 'in-progress',
        progress: 0
      });

      await enrolledCourse.save();

      return res.status(200).json({
        message: "STK Query Successful and course enrolled",
        data: response.data,
        enrolledCourse: enrolledCourse
      });
    } else {
      // Payment was not successful
      return res.status(200).json({
        message: "STK Query Successful but payment failed",
        data: response.data
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const callback = async (req, res) => {
  res.status(200).json("success");
};
