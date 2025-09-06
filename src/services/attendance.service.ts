import attendanceRepository from '../repository/attendance.repository';

class AttendanceService {
  private attendanceRepo = attendanceRepository;

  async list(filters: { employee_id?: number; from?: string; to?: string; date?: string }) {
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

  async getById(id: number) {
    return this.attendanceRepo.findById(id);
  }

  async upsert(data: { employee_id: number; date: string; check_in_time: string }) {
    const existing = await this.attendanceRepo.findOneWhere({
      employee_id: data.employee_id,
      date: data.date,
    });

    if (existing) {
      return this.attendanceRepo.update(existing.id, { check_in_time: data.check_in_time });
    }

    return this.attendanceRepo.create(data);
  }

  async update(id: number, data: Record<string, any>) {
    return this.attendanceRepo.update(id, data);
  }

  async delete(id: number) {
    return this.attendanceRepo.delete(id);
  }

  async monthlyAttendance(month: string, employee_id?: number) {
    return this.attendanceRepo.getMonthlySummary(month, employee_id);
  }
}

export default new AttendanceService();
