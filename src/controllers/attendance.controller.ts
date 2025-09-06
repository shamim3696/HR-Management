import { Request, Response } from 'express';
import attendanceService from '../services/attendance.service';

class AttendanceController {
  protected attendanceService = attendanceService;

  async list(req: Request, res: Response) {
    try {
      const { employee_id, date, from, to } = req.query;
      const result = await attendanceService.list({
        employee_id: employee_id ? Number(employee_id) : undefined,
        date: date as string,
        from: from as string,
        to: to as string,
      });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await attendanceService.getById(Number(id));
      if (!result) {
        return res.status(404).json({ message: 'Attendance not found' });
      }
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async upsert(req: Request, res: Response) {
    try {
      const { employee_id, date, check_in_time } = req.body;
      const result = await attendanceService.upsert({ employee_id, date, check_in_time });
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await attendanceService.update(Number(id), req.body);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedCount = await attendanceService.delete(Number(id));
      if (!deletedCount) {
        return res.status(404).json({ message: 'Attendance not found' });
      }
      res.json({ message: 'Attendance deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async attendance(req: Request, res: Response) {
    try {
      const { month, employee_id } = req.query;

      if (!month) {
        return res.status(400).json({ message: 'month (YYYY-MM) is required' });
      }

      const result = await attendanceService.monthlyAttendance(
        month as string,
        employee_id ? Number(employee_id) : undefined,
      );

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new AttendanceController();
