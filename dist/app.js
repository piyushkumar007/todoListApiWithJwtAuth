"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
exports.app.use(body_parser_1.default.json());
exports.app.use('/api/auth', authRoutes_1.default);
exports.app.use('/api', todoRoutes_1.default);
(0, db_1.default)().then(() => {
    exports.app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
