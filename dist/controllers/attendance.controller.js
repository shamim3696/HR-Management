"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_service_1 = __importDefault(require("../services/attendance.service"));
class AttendanceController {
    constructor() {
        this.attendanceService = attendance_service_1.default;
    }
    async list(req, res) {
        try {
            const { employee_id, date, from, to } = req.query;
            const result = await attendance_service_1.default.list({
                employee_id: employee_id ? Number(employee_id) : undefined,
                date: date,
                from: from,
                to: to,
            });
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const result = await attendance_service_1.default.getById(Number(id));
            if (!result) {
                return res.status(404).json({ message: 'Attendance not found' });
            }
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async upsert(req, res) {
        try {
            const { employee_id, date, check_in_time } = req.body;
            const result = await attendance_service_1.default.upsert({ employee_id, date, check_in_time });
            res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const result = await attendance_service_1.default.update(Number(id), req.body);
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedCount = await attendance_service_1.default.delete(Number(id));
            if (!deletedCount) {
                return res.status(404).json({ message: 'Attendance not found' });
            }
            res.json({ message: 'Attendance deleted successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    async attendance(req, res) {
        try {
            const { month, employee_id } = req.query;
            if (!month) {
                return res.status(400).json({ message: 'month (YYYY-MM) is required' });
            }
            const result = await attendance_service_1.default.monthlyAttendance(month, employee_id ? Number(employee_id) : undefined);
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
exports.default = new AttendanceController();
