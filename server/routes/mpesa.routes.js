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

const router = express.Router();

router.get('/', home);
router.post('/stk', mpesaTokenGenerate, stkPush);
router.post('/stkquery', mpesaTokenGenerate, stkQuery);
router.post('/secure-webhook-3947', verifySafaricomIP, callback);



export default router;
