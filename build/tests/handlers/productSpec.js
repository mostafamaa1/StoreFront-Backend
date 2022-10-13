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
const request = (0, supertest_1.default)(index_1.default);
const newUser = {
    username: 'testUser',
    firstname: 'testName',
    lastname: 'testLastName',
    password: 'test123'
};
const token = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET);
describe('Products Endpoint Tests', () => {
    it('Should Fail to create new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/products').send({
            name: 'testproduct',
            price: 50,
            type: 'hardware'
        });
        expect(response.status).toBe(401);
    }));
    it('Should get all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products');
        expect(response.status).toBe(200);
    }));
    it('Should get a product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products/1');
        expect(response.status).toBe(200);
    }));
    it('Should fail to Update product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/products/1').send({
            name: 'testproduct',
            price: 50,
            type: 'hardware'
        });
        expect(response.status).toBe(401);
    }));
    it('Should fail to delete a product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/products/1');
        expect(response.status).toBe(401);
    }));
    describe('Tests Using token', () => {
        it('Should create a new product with jwt', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post('/products')
                .send({
                name: 'testproduct',
                price: 50,
                type: 'hardware'
            })
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('Should Update a product by id with jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .put('/products/1')
                .send({
                name: 'testproduct 2',
                price: 70,
                type: 'hardware'
            })
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('Should delete a user by id with jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .delete('/products/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        // Delete users and products table after all specs is tested
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield config_1.default.connect();
            yield conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
            yield conn.query('DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;');
            conn.release();
        }));
    });
});
