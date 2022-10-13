"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Environment variables for database connection
const { DB_HOST, DB_DATABASE, DB_DATABASE_TEST, DB_USER, DB_PASS, ENV } = process.env;
console.log(ENV);
// Database Connection
const client = new pg_1.Pool({
    host: DB_HOST,
    database: ENV === 'dev' ? DB_DATABASE : DB_DATABASE_TEST,
    user: DB_USER,
    password: DB_PASS
});
exports.default = client;
