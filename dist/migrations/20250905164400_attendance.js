"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
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
async function down(knex) {
    return knex.schema.dropTableIfExists('attendance');
}
