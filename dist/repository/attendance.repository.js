"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const base_repository_1 = __importDefault(require("./base.repository"));
class AttendanceRepository extends base_repository_1.default {
    constructor() {
        super('attendance');
    }
    async getMonthlySummary(month, employee_id) {
        const [year, monthPart] = month.split('-');
        const startDate = `${year}-${monthPart}-01`;
        const endDate = `${year}-${monthPart}-31`;
        let query = (0, db_1.default)('attendance as a')
            .join('employees as e', 'a.employee_id', 'e.id')
            .whereBetween('a.date', [startDate, endDate])
            .select('a.employee_id', 'e.name', db_1.default.raw('COUNT(a.id) as days_present'), db_1.default.raw(`SUM(CASE WHEN a.check_in_time > '09:45:00' THEN 1 ELSE 0 END) as times_late`))
            .groupBy('a.employee_id', 'e.name');
        if (employee_id) {
            query = query.andWhere('a.employee_id', employee_id);
        }
        return query;
    }
}
exports.default = new AttendanceRepository();
