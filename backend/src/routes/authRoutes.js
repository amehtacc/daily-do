import express from 'express';
import { signup, signin, logout, checkMe } from '../controllers/authController.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import {userSignupSchema, userSigninSchema} from "../validations/user.schema.js"
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router()

router.post('/signup', validateSchema(userSignupSchema), signup)
router.post('/signin', validateSchema(userSigninSchema), signin)
router.post('/logout', authMiddleware, logout)
router.get('/me', authMiddleware, checkMe)

export default router