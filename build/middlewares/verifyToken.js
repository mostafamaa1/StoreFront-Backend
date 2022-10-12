"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.TOKEN_SECRET;
// Verify token middleware
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded) {
            next();
        }
        else {
            res.status(401).send('Invalid or Expired Token');
        }
    }
    catch (err) {
        res.status(401).json({ error: `Invalid token: ${err}` });
    }
};
exports.verifyAuthToken = verifyAuthToken;
