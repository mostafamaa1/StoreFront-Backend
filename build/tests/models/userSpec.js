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
const users_1 = require("../../models/users");
const config_1 = __importDefault(require("../../config"));
const store = new users_1.userModel();
describe('User Model Test', () => {
    const newUser = {
        username: 'testUser',
        firstname: 'testName',
        lastname: 'testLastName',
        password: 'test123'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new user before all tests run
        yield store.create(newUser);
    }));
    describe('User Functionalities', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });
        it('should have a authentication method', () => {
            expect(store.auth).toBeDefined();
        });
        it('should have a update method', () => {
            expect(store.update).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(store.delete).toBeDefined();
        });
        it('index method should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toEqual([
                {
                    id: 1,
                    username: 'testUser',
                    firstname: 'testName',
                    lastname: 'testLastName'
                }
            ]);
        }));
        it('show method should return the user by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(1);
            expect(result).toEqual({
                id: 1,
                username: 'testUser',
                firstname: 'testName',
                lastname: 'testLastName'
            });
        }));
        it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.create(newUser);
            expect(result).toEqual([
                {
                    id: 2,
                    username: 'testUser',
                    firstname: 'testName',
                    lastname: 'testLastName'
                }
            ]);
        }));
        it('auth method should authenticate user information', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.auth('testUser', 'test123');
            expect(result).toBeTruthy();
        }));
        it('update method to update the user by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.update({
                id: 1,
                username: 'UpdatedUser',
                firstname: 'UpdatedName',
                lastname: 'UpdatedLastName',
                password: '12345678'
            });
            expect(result).toEqual({
                id: 1,
                username: 'UpdatedUser',
                firstname: 'UpdatedName',
                lastname: 'UpdatedLastName'
            });
        }));
        it('delete method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.delete(1);
            expect(result).toEqual(result);
        }));
        // Delete users table after all specs is tested
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield config_1.default.connect();
            yield conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
            conn.release();
        }));
    });
});
