"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = parseInt(process.env.SALT_ROUNDS);
// User model with all crud actions
class userModel {
    // Gets All users
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'SELECT id, username, firstname, lastname FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not show all users. Error: ${err}`);
            }
        });
    }
    // Create method takes username, firstname, lastname and password and returns created user
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'INSERT INTO users (username, firstname, lastname, password_hash) VALUES($1, $2, $3, $4) RETURNING id, username, firstname, lastname';
                const password_hash = bcrypt_1.default.hashSync(u.password + pepper, saltRounds);
                const result = yield conn.query(sql, [
                    u.username,
                    u.firstname,
                    u.lastname,
                    password_hash
                ]);
                const user = result.rows;
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not create user. Error: ${err}`);
            }
        });
    }
    // Show users by id
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = `SELECT id, username, firstname, lastname FROM users WHERE id = $1`;
                const result = yield config_1.default.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get user: ${err}`);
            }
        });
    }
    // Authenticate user by username and password
    auth(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'SELECT * FROM users WHERE username=($1)';
                const result = yield conn.query(sql, [username]);
                console.log(password + pepper);
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + pepper, user.password_hash)) {
                        return user;
                    }
                }
                throw new Error('Password incorrect');
            }
            catch (err) {
                throw new Error(`Could not authenticate user: ${err}`);
            }
        });
    }
    // Update users by id
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'UPDATE users SET username = $1, firstname = $2, lastname = $3, password_hash = $4 WHERE id = $5 RETURNING id, username, firstname, lastname;';
                const hash = bcrypt_1.default.hashSync(u.password + pepper, saltRounds);
                const result = yield conn.query(sql, [
                    u.username,
                    u.firstname,
                    u.lastname,
                    hash,
                    u.id
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not update user: ${err}`);
            }
        });
    }
    // delete users by id
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
                const result = yield config_1.default.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete user: ${err}`);
            }
        });
    }
}
exports.userModel = userModel;
