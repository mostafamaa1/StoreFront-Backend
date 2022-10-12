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
const index_1 = __importDefault(require("../../index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const supertest_1 = __importDefault(require("supertest"));
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const dashboard_1 = require("../../services/dashboard");
const orderStore = new orders_1.orderModel();
const productStore = new products_1.productModel();
const userStore = new users_1.userModel();
const board = new dashboard_1.dashboard();
const request = (0, supertest_1.default)(index_1.default);
const newOrder = {
    user_id: 1,
    status: 'active'
};
const newProduct = {
    name: 'laptop',
    price: 500,
    type: 'hardware'
};
const newUser = {
    username: 'testUser',
    firstname: 'testName',
    lastname: 'testLastName',
    password: 'test123'
};
const newOrderedProduct = {
    order_id: 1,
    product_id: 1,
    quantity: 5
};
const token = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET);
describe('Dashboard Endpoint Tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new user before all tests run
        yield userStore.create(newUser);
        // Create a new order before all tests run
        yield orderStore.create(newOrder);
        // Create a new order before all tests run
        yield productStore.create(newProduct);
    }));
    it('should fail to add product to existing order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/orders/1/products')
            .send(newOrderedProduct);
        expect(response.status).toBe(401);
    }));
    it('should fail to return correct products by order id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders/1/products');
        expect(response.status).toBe(401);
    }));
    describe('Tests Using token', () => {
        it('should return correct products by order id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/orders/1/products')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('should add product to existing order', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post('/orders/1/products')
                .send({
                order_id: 1,
                product_id: 1,
                quantity: 5
            })
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        // Delete orders, users, products and order_products tables after all specs is tested
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield config_1.default.connect();
            yield conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
            yield conn.query('DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
            yield conn.query('DELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;');
            yield conn.query('DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;');
            conn.release();
        }));
    });
});
