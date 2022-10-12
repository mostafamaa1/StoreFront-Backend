import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// Environment variables for database connection
const { DB_HOST, DB_DATABASE, DB_DATABASE_TEST, DB_USER, DB_PASS, ENV } =
  process.env;

console.log(ENV);

// Database Connection
const client = new Pool({
  host: DB_HOST,
  database: ENV === 'dev' ? DB_DATABASE : DB_DATABASE_TEST,
  user: DB_USER,
  password: DB_PASS
});

export default client;
