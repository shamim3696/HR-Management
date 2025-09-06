import db from '../config/db';
import BaseRepository from './base.repository';

class AttendanceRepository extends BaseRepository {
  constructor() {
    super('attendance');
  }

  async getMonthlySummary(month: string, employee_id?: number) {
    const [year, monthPart] = month.split('-');
    const startDate = `${year}-${monthPart}-01`;
    const endDate = `${year}-${monthPart}-31`;

    let query = db('attendance as a')
      .join('employees as e', 'a.employee_id', 'e.id')
      .whereBetween('a.date', [startDate, endDate])
      .select(
        'a.employee_id',
        'e.name',
        db.raw('COUNT(a.id) as days_present'),
        db.raw(`SUM(CASE WHEN a.check_in_time > '09:45:00' THEN 1 ELSE 0 END) as times_late`),
      )
      .groupBy('a.employee_id', 'e.name');

    if (employee_id) {
      query = query.andWhere('a.employee_id', employee_id);
    }

    return query;
  }
}

export default new AttendanceRepository();
