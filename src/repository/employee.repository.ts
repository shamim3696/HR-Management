import db from '../config/db';
import BaseRepository from './base.repository';

interface GetEmployeesOptions {
  page: number;
  limit: number;
  filters: Record<string, string>;
}

class EmployeeRepository extends BaseRepository {
  protected table: string;

  constructor() {
    super('employees');
    this.table = 'employees';
  }

  // Get all employees
  async getEmployees({ page, limit, filters }: GetEmployeesOptions) {
    const query = db(this.table)
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

    const totalCountResult = await db(this.table)
      .where((builder) => {
        if (filters.name) builder.where('name', 'like', `%${filters.name}%`);
        if (filters.age) builder.where('age', filters.age);
        if (filters.designation) builder.where('designation', 'like', `%${filters.designation}%`);
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

export default new EmployeeRepository();
