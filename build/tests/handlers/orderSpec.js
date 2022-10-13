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
const index_1 = __importDefault(require("../../index"));
const config_1 = __importDefault(require("../../config"));
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../../models/users");
const store = new users_1.userModel();
const request = (0, supertest_1.default)(index_1.default);
const newUser = {
    username: 'testUser',
    firstname: 'testName',
    lastname: 'testLastName',
    password: 'test123'
};
describe('orders Endpoint Tests', () => {
    let token = '';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new user before all tests run
        const response = yield request.post('/users').send(newUser);
        token = response.body;
    }));
    it('Should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/orders').send({
            status: 'active',
            user_id: 1
        });
        expect(response.status).toBe(200);
    }));
    it('Should get all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders');
        expect(response.status).toBe(200);
    }));
    it('Should get order by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders/1');
        expect(response.status).toBe(200);
    }));
    it('Should fail to Update order by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/orders/1').send({
            id: 1,
            status: 'completed'
        });
        expect(response.status).toBe(401);
    }));
    it('Should fail to delete a order by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/orders/1');
        expect(response.status).toBe(401);
    }));
    describe('Tests Using token', () => {
        it('Should show orders by userId with jwt', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/orders/user/1')
                .set('Authorization', `Bearer ${token}`);
            console.log('token:', token);
            expect(response.status).toBe(200);
        }));
        it('Should Update a order by id with jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .put('/orders/1')
                .send({
                id: 1,
                status: 'completed'
            })
                .set('Authorization', `Bearer ${token}`);
            console.log('token:', token);
            expect(response.status).toBe(200);
        }));
        it('Should delete a user by id with jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .delete('/orders/1')
                .set('Authorization', `Bearer ${token}`);
            console.log('token:', token);
            expect(response.status).toBe(200);
        }));
        // Delete users and orders table after all specs is tested
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield config_1.default.connect();
            yield conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
            yield conn.query('DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
            conn.release();
        }));
    });
});
