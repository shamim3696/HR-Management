"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_repository_1 = __importDefault(require("../repository/employee.repository"));
const appError_1 = __importDefault(require("../utils/appError"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class EmployeeService {
    //create employee
    async createEmployee(employee) {
        try {
            const result = await employee_repository_1.default.create(employee);
            return result[0];
        }
        catch (error) {
            console.error('Error creating employee:', error);
            throw error;
        }
    }
    //get employee by id
    async getEmployeeById(id) {
        try {
            const result = await employee_repository_1.default.findById(Number(id));
            if (!result) {
                throw new appError_1.default('Employee not found', 404);
            }
            return result;
        }
        catch (error) {
            console.error('Error fetching employee:', error);
            throw error;
        }
    }
    // Update employee by ID
    async updateEmployeeById(id, updatedData) {
        try {
            const employee = await employee_repository_1.default.findById(Number(id));
            if (!employee) {
                throw new Error('Employee not found');
            }
            if (updatedData.photo_path) {
                const oldPhotoPath = employee.photo_path;
                if (oldPhotoPath) {
                    const oldFilePath = path_1.default.join(__dirname, 'uploads', oldPhotoPath);
                    if (fs_1.default.existsSync(oldFilePath)) {
                        fs_1.default.unlinkSync(oldFilePath);
                    }
                }
            }
            const updatedEmployee = await employee_repository_1.default.update(Number(id), updatedData);
            return updatedEmployee;
        }
        catch (error) {
            console.error('Error in updateEmployeeById:', error);
            throw error;
        }
    }
    // Delete employee by ID
    async deleteEmployeeById(id) {
        try {
            const employee = await employee_repository_1.default.findById(Number(id));
            if (!employee) {
                throw new Error('Employee not found');
            }
            if (employee.photo_path) {
                const photoPath = path_1.default.join(__dirname, 'uploads', employee.photo_path);
                if (fs_1.default.existsSync(photoPath)) {
                    fs_1.default.unlinkSync(photoPath);
                }
            }
            await employee_repository_1.default.delete(Number(id));
            return { success: true };
        }
        catch (error) {
            console.error('Error in deleteEmployeeById:', error);
            throw error;
        }
    }
    //get all
    async getEmployees(options) {
        try {
            // Call repository method to fetch employees
            const result = await employee_repository_1.default.getEmployees(options);
            return result;
        }
        catch (error) {
            console.error('Error fetching employees:', error);
            throw new Error('Error fetching employees');
        }
    }
}
exports.default = new EmployeeService();
