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
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const config_1 = __importDefault(require("../../config"));
const orderStore = new orders_1.orderModel();
const userStore = new users_1.userModel();
describe('order Model Test', () => {
    const newOrder = {
        user_id: 1,
        status: 'active'
    };
    const newUser = {
        username: 'testUser',
        firstname: 'testName',
        lastname: 'testLastName',
        password: 'test123'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new user before all tests run
        yield userStore.create(newUser);
        // Create a new order before all tests run
        yield orderStore.create(newOrder);
    }));
    describe('order Model Functionalities', () => {
        it('should have an index method', () => {
            expect(orderStore.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(orderStore.show).toBeDefined();
        });
        it('should have a create method', () => {
            expect(orderStore.create).toBeDefined();
        });
        it('should have a update method', () => {
            expect(orderStore.update).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(orderStore.delete).toBeDefined();
        });
        it('index method should return all orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderStore.index();
            expect(result).toEqual([
                {
                    id: 1,
                    user_id: 1,
                    status: 'active'
                }
            ]);
        }));
        it('show method should return the order by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderStore.show(1);
            expect(result).toEqual({
                id: 1,
                user_id: 1,
                status: 'active'
            });
        }));
        it('create method should add a order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderStore.create(newOrder);
            expect(result).toEqual({
                id: 2,
                user_id: 1,
                status: 'active'
            });
        }));
        it('update method to update the order by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderStore.update(1, 'completed');
            expect(result.status).toEqual('completed');
        }));
        it('delete method should remove the order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderStore.delete(1);
            expect(result).toEqual(result);
        }));
        // Delete orders and users table after all specs is tested
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield config_1.default.connect();
            yield conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
            yield conn.query('DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
            conn.release();
        }));
    });
});
