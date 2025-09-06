import express from 'express';
import authController from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import { hrUserCreateSchema, hrUserLoginSchema } from '../validationRules/hr.validation';

const router = express.Router();

router.post('/', validate(hrUserCreateSchema), authController.registration);
router.post('/login', validate(hrUserLoginSchema), authController.login);

export default router;
