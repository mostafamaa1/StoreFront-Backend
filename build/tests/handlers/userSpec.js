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
describe('User Endpoint Tests', () => {
    it('index method should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/users').send({
            username: 'testUser',
            firstname: 'testName',
            lastname: 'testLastName',
            password: 'test123'
        });
        expect(response.status).toBe(200);
    }));
    it('Should fail to get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/users');
        expect(response.status).toBe(401);
    }));
    it('Should fail to get users by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/users/1');
        expect(response.status).toBe(401);
    }));
    it('Should fail to Update users by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/users/1').send({
            username: 'testUser',
            firstname: 'testName',
            lastname: 'testLastName',
            password: 'test123'
        });
        expect(response.status).toBe(401);
    }));
    it('Should fail to delete a user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/users/1');
        expect(response.status).toBe(401);
    }));
    describe('Tests Using token', () => {
        it('Should get all users with jwt', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('Should get users by id with jwt', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/users/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('Should Update a user by id with jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .put('/users/1')
                .send({
                username: 'testUser',
                firstname: 'testName',
                lastname: 'testLastName',
                password: 'test123'
            })
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('Should delete a user by id with jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .delete('/users/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        // Delete users table after all specs is tested
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield config_1.default.connect();
            yield conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
            conn.release();
        }));
    });
});
