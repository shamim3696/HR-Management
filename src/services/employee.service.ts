import employeeRepository from '../repository/employee.repository';
import AppError from '../utils/appError';
import fs from 'fs';
import path from 'path';

interface GetEmployeesOptions {
  page: number;
  limit: number;
  filters: Record<string, string>;
}

class EmployeeService {
  //create employee
  async createEmployee(employee: any) {
    try {
      const result = await employeeRepository.create(employee);
      return result[0];
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  }

  //get employee by id
  async getEmployeeById(id: string) {
    try {
      const result = await employeeRepository.findById(Number(id));
      if (!result) {
        throw new AppError('Employee not found', 404);
      }
      return result;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  }

  // Update employee by ID
  async updateEmployeeById(id: string, updatedData: any) {
    try {
      const employee = await employeeRepository.findById(Number(id));

      if (!employee) {
        throw new Error('Employee not found');
      }

      if (updatedData.photo_path) {
        const oldPhotoPath = employee.photo_path;

        if (oldPhotoPath) {
          const oldFilePath = path.join(__dirname, 'uploads', oldPhotoPath);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
      }

      const updatedEmployee = await employeeRepository.update(Number(id), updatedData);

      return updatedEmployee;
    } catch (error) {
      console.error('Error in updateEmployeeById:', error);
      throw error;
    }
  }

  // Delete employee by ID
  async deleteEmployeeById(id: string) {
    try {
      const employee = await employeeRepository.findById(Number(id));

      if (!employee) {
        throw new Error('Employee not found');
      }

      if (employee.photo_path) {
        const photoPath = path.join(__dirname, 'uploads', employee.photo_path);
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
      }

      await employeeRepository.delete(Number(id));

      return { success: true };
    } catch (error) {
      console.error('Error in deleteEmployeeById:', error);
      throw error;
    }
  }

  //get all
  async getEmployees(options: GetEmployeesOptions) {
    try {
      // Call repository method to fetch employees
      const result = await employeeRepository.getEmployees(options);

      return result;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw new Error('Error fetching employees');
    }
  }
}

export default new EmployeeService();
