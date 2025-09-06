import db from '../config/db';

class BaseRepository {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  findAll() {
    return db(this.tableName).select('*');
  }

  findById(id: number) {
    return db(this.tableName)
      .where({ id })
      .first()
      .select('id', 'name', 'age', 'designation', 'hiring_date', 'date_of_birth', 'salary', 'photo_path');
  }

  create(data: Record<string, any>) {
    return db(this.tableName).insert(data).returning('*');
  }

  update(id: number, data: Record<string, any>) {
    return db(this.tableName)
      .where({ id })
      .update(data)
      .returning(['id', 'name', 'age', 'designation', 'hiring_date', 'date_of_birth', 'salary', 'photo_path']);
  }

  delete(id: number) {
    return db(this.tableName).where({ id }).del();
  }

  findWhere(where: Record<string, any>) {
    return db(this.tableName).where(where);
  }

  findOneWhere(where: Record<string, any>) {
    return db(this.tableName).where(where).first();
  }
}

export default BaseRepository;
