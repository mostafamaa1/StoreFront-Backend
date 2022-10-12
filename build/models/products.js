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
exports.productModel = void 0;
const config_1 = __importDefault(require("../config"));
class productModel {
    // Gets All products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get products. Error: ${err}`);
            }
        });
    }
    // Show products by id
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const conn = yield config_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find product ${id}. Error: ${err}`);
            }
        });
    }
    // Create method takes name, price and type and returns the entered product
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'INSERT INTO products (name, price, type) VALUES($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [p.name, p.price, p.type]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not add new product. Error: ${err}`);
            }
        });
    }
    // Update products by id
    update(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield config_1.default.connect();
                const sql = 'UPDATE products SET name = $1, price = $2, type = $3 WHERE id = $4 RETURNING *';
                const result = yield conn.query(sql, [p.name, p.price, p.type, p.id]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Unable to edit Product (${p.name}): ${err}`);
            }
        });
    }
    // Delete products by id
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
                const conn = yield config_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not delete product ${id}. Error: ${err}`);
            }
        });
    }
}
exports.productModel = productModel;
