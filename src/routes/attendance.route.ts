import express from 'express';
import attendanceController from '../controllers/attendance.controller';

const router = express.Router();

router.get('/', attendanceController.list);
router.get('/:id', attendanceController.getById);
router.post('/', attendanceController.upsert);
router.put('/:id', attendanceController.update);
router.delete('/:id', attendanceController.delete);
router.get('/reports/attendance', attendanceController.attendance);

export default router;
