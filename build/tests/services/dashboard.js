"use strict";
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const dashboard_1 = require("../../services/dashboard");
const orderStore = new orders_1.orderModel();
const productStore = new products_1.productModel();
const userStore = new users_1.userModel();
const board = new dashboard_1.dashboard();
describe('order Model Test', () => {
    const newOrder = {
        user_id: 1,
        status: "active"
    };
    const newProduct = {
        name: "laptop",
        price: 500,
        type: "computer hardware"
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
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new user before all tests run
        yield userStore.create(newUser);
        // Create a new order before all tests run
        yield orderStore.create(newOrder);
        // Create a new order before all tests run
        yield productStore.create(newProduct);
        // add a new product to existing order before all tests run
        yield board.addProduct(newOrderedProduct);
    }));
    it("should have addProduct method", () => {
        expect(board.addProduct).toBeDefined();
    });
    it("should have showProducts method", () => {
        expect(board.showProducts).toBeDefined();
    });
    it("should return correct order id", () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield board.addProduct(newOrderedProduct);
        expect(order).toEqual({
            product_id: 1,
            quantity: 5
        });
    }));
    it("should return products list", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield board.showProducts(1);
        expect(products).toEqual([{
                id: 4,
                status: "completed",
                user_id: 1,
                quantity: 5,
                order_id: 1,
                product_id: 1
            }]);
    }));
    // Delete orders and users table after all specs is tested
    /* afterAll(async () => {
       const conn = await client.connect()
       await conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;')
       await conn.query('DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;')
   
       conn.release()
     })  */
});
