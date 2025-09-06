"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const base_repository_1 = __importDefault(require("./base.repository"));
class EmployeeRepository extends base_repository_1.default {
    constructor() {
        super('employees');
        this.table = 'employees';
    }
    // Get all employees
    async getEmployees({ page, limit, filters }) {
        const query = (0, db_1.default)(this.table)
            .select('id', 'name', 'age', 'designation', 'hiring_date', 'date_of_birth', 'salary', 'photo_path')
            .where((builder) => {
            if (filters.name) {
                builder.where('name', 'like', `%${filters.name}%`);
            }
            if (filters.age) {
                builder.where('age', filters.age);
            }
            if (filters.designation) {
                builder.where('designation', 'like', `%${filters.designation}%`);
            }
        });
        const totalCountResult = await (0, db_1.default)(this.table)
            .where((builder) => {
            if (filters.name)
                builder.where('name', 'like', `%${filters.name}%`);
            if (filters.age)
                builder.where('age', filters.age);
            if (filters.designation)
                builder.where('designation', 'like', `%${filters.designation}%`);
        })
            .count('* as count');
        const totalCount = Number(totalCountResult[0].count);
        const totalPages = Math.ceil(totalCount / limit);
        query.offset((page - 1) * limit).limit(limit);
        const employees = await query;
        return {
            employees,
            totalCount,
            totalPages,
        };
    }
}
exports.default = new EmployeeRepository();
