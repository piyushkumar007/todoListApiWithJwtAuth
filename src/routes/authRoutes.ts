import express from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { register} from '../controllers/authController';
import { login } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', asyncHandler(login));
export default router;
