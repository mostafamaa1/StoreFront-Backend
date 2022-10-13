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
const products_1 = require("../../models/products");
const config_1 = __importDefault(require("../../config"));
const store = new products_1.productModel();
describe('Product Model Test', () => {
    const newProduct = {
        name: 'laptop',
        price: 500,
        type: 'computer hardware'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new product before all tests run
        yield store.create(newProduct);
    }));
    describe('Product Model Functionalities', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });
        it('should have a update method', () => {
            expect(store.update).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(store.delete).toBeDefined();
        });
        it('index method should return all products', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toEqual([
                {
                    id: 1,
                    name: 'laptop',
                    price: 500,
                    type: 'computer hardware'
                }
            ]);
        }));
        it('show method should return the product by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(1);
            expect(result).toEqual({
                id: 1,
                name: 'laptop',
                price: 500,
                type: 'computer hardware'
            });
        }));
        it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.create(newProduct);
            expect(result).toEqual({
                id: 2,
                name: 'laptop',
                price: 500,
                type: 'computer hardware'
            });
        }));
        it('update method to update the product by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.update({
                id: 1,
                name: 'laptop V2',
                price: 700,
                type: 'computer hardware'
            });
            expect(result).toEqual({
                id: 1,
                name: 'laptop V2',
                price: 700,
                type: 'computer hardware'
            });
        }));
        it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.delete(1);
            expect(result).toEqual(result);
        }));
        // Delete products table after all specs is tested
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield config_1.default.connect();
            yield conn.query('DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;');
            conn.release();
        }));
    });
});
