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
exports.orderRoutes = void 0;
const orders_1 = require("../models/orders");
const verifyToken_1 = require("../middlewares/verifyToken");
//Order Routes
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.get('/orders/user/:id', verifyToken_1.verifyAuthToken, showByUserID);
    app.post('/orders', create);
    app.put('/orders/:id', verifyToken_1.verifyAuthToken, update);
    app.delete('/orders/:id', verifyToken_1.verifyAuthToken, destroy);
};
exports.orderRoutes = orderRoutes;
//order model import
const store = new orders_1.orderModel();
// index method Shows all orders
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.index();
    res.json(orders);
});
// show method inputs id to model then send selected order as response
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(parseInt(req.params.id));
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `Could not show order by id: ${err}` });
    }
});
// show method inputs id to model then send selected order as response
const showByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderByUser = yield store.showByUserID(parseInt(req.params.id));
        res.json(orderByUser);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `Could not show order by user id: ${err}` });
    }
});
// create method takes order info from request and passes it to model then returns created order
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = {
            user_id: req.body.user_id,
            status: req.body.status
        };
        const order = yield store.create(newOrder);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `Could not create order: ${err}` });
    }
});
// update method updates order information
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const status = req.body.status;
        const updatedOrder = yield store.update(id, status);
        res.send(updatedOrder);
    }
    catch (err) {
        res.status(500);
        res.json({ error: `Could not update order: ${err}` });
    }
});
// destroy method deletes order by id
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield store.delete(parseInt(req.params.id));
        res.json(deletedUser);
    }
    catch (err) {
        res.status(500);
        res.json({ error: `Could not delete order: ${err}` });
    }
});
exports.default = exports.orderRoutes;
