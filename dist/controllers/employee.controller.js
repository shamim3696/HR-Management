"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_service_1 = __importDefault(require("../services/employee.service"));
class EmployeeController {
    //create employee
    async createEmployee(req, res) {
        try {
            const fileName = req.file?.filename;
            const value = { ...req.body, photo_path: fileName };
            const employee = await employee_service_1.default.createEmployee(value);
            res.status(201).json({
                success: 'true',
                data: employee,
            });
        }
        catch (err) {
            throw err;
        }
    }
    //get employee by id
    async getEmployeeById(req, res) {
        try {
            const employee = await employee_service_1.default.getEmployeeById(req.params.id);
            res.json({ success: 'true', message: 'Employee fetched successfully', data: employee });
        }
        catch (error) {
            throw error;
        }
    }
    //update employee by id
    async updateEmployeeById(req, res) {
        try {
            const { id } = req.params;
            const { body, file } = req;
            const updatedData = {
                ...body,
                ...(file && { photo_path: file.filename }),
            };
            // Call the service to update employee data
            const updatedEmployee = await employee_service_1.default.updateEmployeeById(id, updatedData);
            return res.json({
                success: true,
                message: 'Employee updated successfully',
                data: updatedEmployee,
            });
        }
        catch (error) {
            throw error;
        }
    }
    //delete employee by id
    async deleteEmployeeById(req, res) {
        try {
            const employee = await employee_service_1.default.deleteEmployeeById(req.params.id);
            res.json({ success: 'true', message: 'Employee deleted successfully' });
        }
        catch (error) {
            throw error;
        }
    }
    //get all
    async getEmployees(req, res) {
        try {
            const { page = 1, limit = 10, ...filters } = req.query;
            const pageNumber = Number(page);
            const limitNumber = Number(limit);
            // Validate page and limit
            if (pageNumber < 1 || limitNumber < 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Page and limit must be positive numbers.',
                });
            }
            // Send to service
            const { employees, totalCount, totalPages } = await employee_service_1.default.getEmployees({
                page: pageNumber,
                limit: limitNumber,
                filters: filters,
            });
            // Send response with pagination data
            res.json({
                success: true,
                message: 'Employees fetched successfully.',
                data: employees || [],
                pagination: {
                    totalCount,
                    totalPages,
                    currentPage: pageNumber,
                    perPage: limitNumber,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new EmployeeController();
