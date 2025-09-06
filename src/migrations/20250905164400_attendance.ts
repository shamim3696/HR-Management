import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('attendance', (table) => {
    table.increments('id').primary();
    table.integer('employee_id').unsigned().notNullable().references('id').inTable('employees').onDelete('CASCADE');

    table.date('date').notNullable();
    table.timestamp('check_in_time').notNullable();

    table.unique(['employee_id', 'date'], {
      indexName: 'attendance_unique_per_day',
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('attendance');
}
