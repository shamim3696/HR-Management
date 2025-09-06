import { Request, Response } from 'express';
import employeeService from '../services/employee.service';

class EmployeeController {
  //create employee
  async createEmployee(req: Request, res: Response) {
    try {
      const fileName = req.file?.filename;
      const value = { ...req.body, photo_path: fileName };

      const employee = await employeeService.createEmployee(value);
      res.status(201).json({
        success: 'true',
        data: employee,
      });
    } catch (err) {
      throw err;
    }
  }

  //get employee by id
  async getEmployeeById(req: Request, res: Response) {
    try {
      const employee = await employeeService.getEmployeeById(req.params.id);
      res.json({ success: 'true', message: 'Employee fetched successfully', data: employee });
    } catch (error) {
      throw error;
    }
  }

  //update employee by id
   async updateEmployeeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body, file } = req;

      const updatedData = {
        ...body,
        ...(file && { photo_path: file.filename }),
      };

      // Call the service to update employee data
      const updatedEmployee = await employeeService.updateEmployeeById(id, updatedData);
      
      return res.json({
        success: true,
        message: 'Employee updated successfully',
        data: updatedEmployee,
      });
    } catch (error) {
      throw error;
    }
  }

  //delete employee by id
  async deleteEmployeeById(req: Request, res: Response) {
    try {
      const employee = await employeeService.deleteEmployeeById(req.params.id);
      res.json({ success: 'true', message: 'Employee deleted successfully'});
    } catch (error) {
      throw error;
    }
  }

  //get all
  async getEmployees(req: Request, res: Response) {
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
      const { employees, totalCount, totalPages } = await employeeService.getEmployees({
        page: pageNumber,
        limit: limitNumber,
        filters: filters as Record<string, string>,
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
    } catch (error: any) {
      throw error;
    }
  }
}

export default new EmployeeController();
