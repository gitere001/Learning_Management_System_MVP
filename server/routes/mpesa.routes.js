// File: server/routes/mpesa.js
import express from 'express';
import {
  home,
  stkPush,
  stkQuery,
  callback
} from '../controllers/mpesaController.js';



import { mpesaTokenGenerate } from '../middlewares/mpesaAuth.js';
import verifySafaricomIP from '../middlewares/mpesaIpCheck.js';
import { verifyRefreshToken } from '../middlewares/verifyUser.middleware.js';

const router = express.Router();

router.get('/', home);
router.post('/stk', mpesaTokenGenerate, stkPush);
router.post('/stkquery', verifyRefreshToken, mpesaTokenGenerate, stkQuery);
router.post('/secure-webhook-3947', verifySafaricomIP, callback);



export default router;
