"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./handlers/user"));
const order_1 = __importDefault(require("./handlers/order"));
const product_1 = __importDefault(require("./handlers/product"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// HTTP request logger middleware
app.use((0, morgan_1.default)('short'));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    try {
        res.send('This is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
(0, user_1.default)(app);
(0, order_1.default)(app);
(0, product_1.default)(app);
(0, dashboard_1.default)(app);
// start express server
app.listen(PORT, () => {
    console.log(`Server is starting at Port:${PORT}`);
});
exports.default = app;
