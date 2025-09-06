import express from 'express';
import employeeController from '../controllers/employee.controller';
import { uploadFile } from '../config/multer';
import validate from '../middlewares/validate';
import { createEmployeeSchema } from '../validationRules/employee.validation';

const router = express.Router();

router.post('/', uploadFile, validate(createEmployeeSchema), employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.patch('/:id', uploadFile, employeeController.updateEmployeeById);
router.delete('/:id', employeeController.deleteEmployeeById);

export default router;
