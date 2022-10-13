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
exports.userRoutes = void 0;
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = require("../middlewares/verifyToken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//User Routes
const userRoutes = (app) => {
    app.get('/users', verifyToken_1.verifyAuthToken, index);
    app.post('/users', create);
    app.get('/users/:id', verifyToken_1.verifyAuthToken, show);
    app.post('/users/auth', auth);
    app.put('/users/:id', verifyToken_1.verifyAuthToken, update);
    app.delete('/users/:id', verifyToken_1.verifyAuthToken, destroy);
};
exports.userRoutes = userRoutes;
// Token Secret
const secret = process.env.TOKEN_SECRET;
//User model class
const store = new users_1.userModel();
// index method Shows all users
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.index();
    res.json(users);
});
// create method create new user
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try {
        const newUser = yield store.create(user);
        const token = jsonwebtoken_1.default.sign({ newUser }, secret);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `User was not created: ${err}` });
    }
});
// show method inputs id to model then send selected user as response
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(parseInt(req.params.id));
        res.json(user);
    }
    catch (err) {
        res.status(500);
        res.json({ error: `Could not get user: ${err}` });
    }
});
// Auth method checks user entered values with the one stored in the database
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const newUser = yield store.auth(username, password);
        res.json(newUser);
    }
    catch (err) {
        res.status(500);
        res.json({ error: `Could not authenticate user: ${err}` });
    }
});
// update method updates user information
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: req.body.id,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try {
        const updatedUser = yield store.update(user);
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500);
        res.json({ error: `Could not update user: ${err}` });
    }
});
// destroy method deletes user by id
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield store.delete(parseInt(req.params.id));
        res.json(deletedUser);
    }
    catch (err) {
        res.status(500);
        res.json({ error: `Could not delete user: ${err}` });
    }
});
exports.default = exports.userRoutes;
