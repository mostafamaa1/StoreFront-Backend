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
exports.dashboard = void 0;
const config_1 = __importDefault(require("../config"));
class dashboard {
    // addproduct method takes in order_id, product_id and quantity then returns the added product
    addProduct(op) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [
                    op.quantity,
                    op.order_id,
                    op.product_id
                ]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Error adding product to existing order. Error: ${err}`);
            }
        });
    }
    // showProducts method selects the inner join between order table and order_products table and returns order based on order_id
    showProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.id = $1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not show products with order_id ${id}. Error: ${err}`);
            }
        });
    }
}
exports.dashboard = dashboard;
