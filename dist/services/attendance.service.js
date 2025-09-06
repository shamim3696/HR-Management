"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_repository_1 = __importDefault(require("../repository/attendance.repository"));
class AttendanceService {
    constructor() {
        this.attendanceRepo = attendance_repository_1.default;
    }
    async list(filters) {
        let query = this.attendanceRepo.findWhere({});
        if (filters.employee_id) {
            query = query.where('employee_id', filters.employee_id);
        }
        if (filters.date) {
            query = query.where('date', filters.date);
        }
        if (filters.from && filters.to) {
            query = query.whereBetween('date', [filters.from, filters.to]);
        }
        return query.select('*');
    }
    async getById(id) {
        return this.attendanceRepo.findById(id);
    }
    async upsert(data) {
        const existing = await this.attendanceRepo.findOneWhere({
            employee_id: data.employee_id,
            date: data.date,
        });
        if (existing) {
            return this.attendanceRepo.update(existing.id, { check_in_time: data.check_in_time });
        }
        return this.attendanceRepo.create(data);
    }
    async update(id, data) {
        return this.attendanceRepo.update(id, data);
    }
    async delete(id) {
        return this.attendanceRepo.delete(id);
    }
    async monthlyAttendance(month, employee_id) {
        return this.attendanceRepo.getMonthlySummary(month, employee_id);
    }
}
exports.default = new AttendanceService();
