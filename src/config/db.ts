import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

// Function to test DB connection
export const checkDbConnection = async () => {
  try {
    await db.raw('SELECT 1+1 AS result');
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // Exit app if DB is not connected
  }
};

export default db;
