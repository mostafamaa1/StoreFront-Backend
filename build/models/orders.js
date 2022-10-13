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
exports.orderModel = void 0;
const config_1 = __importDefault(require("../config"));
class orderModel {
    //Show All Orders
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
        });
    }
    //Show Order By order id
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const conn = yield config_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`);
            }
        });
    }
    //Show Order By user ID
    showByUserID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id=($1)';
                const result = yield conn.query(sql, [id]);
                const order = result.rows;
                conn.release();
                return order;
            }
            catch (error) {
                throw new Error(`Unable to get the order error: ${error}`);
            }
        });
    }
    // Create order and return entered order content
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
                const result = yield conn.query(sql, [o.status, o.user_id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add new order. Error: ${err}`);
            }
        });
    }
    //Update Order by id
    update(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'UPDATE orders SET status=($2) WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id, status]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Failed to update order: ${err}`);
            }
        });
    }
    //Delete Order by id
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                const conn = yield config_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. Error: ${err}`);
            }
        });
    }
}
exports.orderModel = orderModel;
