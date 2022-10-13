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
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const verifyToken_1 = require("../middlewares/verifyToken");
//Product routes
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyToken_1.verifyAuthToken, create);
    app.put('/products/:id', verifyToken_1.verifyAuthToken, update);
    app.delete('/products/:id', verifyToken_1.verifyAuthToken, destroy);
};
// Product model class
const store = new products_1.productModel();
// index method Shows all products
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield store.index();
    res.json(products);
});
// show method inputs id to model then send selected product as response
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.show(parseInt(req.params.id));
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `Could not get product: ${err}` });
    }
});
// create method create new product
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type
        };
        const newProduct = yield store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `Could not create product: ${err}` });
    }
});
// update method updates product information
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        id: req.body.id
    };
    try {
        const editedProduct = yield store.update(product);
        res.json(editedProduct);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `Could not update product: ${err}` });
    }
});
// destroy method deletes product by id
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield store.delete(parseInt(req.params.id));
        res.json(deletedUser);
    }
    catch (err) {
        res.status(500);
        res.json({ error: `Could not delete product: ${err}` });
    }
});
exports.default = productRoutes;
