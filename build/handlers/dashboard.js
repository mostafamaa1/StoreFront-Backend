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
exports.dashRoutes = void 0;
const dashboard_1 = require("../services/dashboard");
const verifyToken_1 = require("../middlewares/verifyToken");
//Dashboard Routes
const dashRoutes = (app) => {
    app.get('/orders/:id/products', verifyToken_1.verifyAuthToken, showProducts);
    app.post('/orders/:id/products', verifyToken_1.verifyAuthToken, productsOrdered);
};
exports.dashRoutes = dashRoutes;
//dashboard model class
const store = new dashboard_1.dashboard();
// productsOrdered method adds an product to an existing order in the products_order table
const productsOrdered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            order_id: parseInt(req.params.id),
            product_id: req.body.product_id,
            quantity: req.body.quantity
        };
        const newProduct = yield store.addProduct(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `Cannot add product: ${err}` });
    }
});
// showproducts method gets the order_products table for the products added to a certain order id
const showProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.showProducts(parseInt(req.params.id));
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `Cannot get product: ${err}` });
    }
});
exports.default = exports.dashRoutes;
