"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = require("@middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/todos', authMiddleware_1.authenticateToken, todoController_1.createTodo);
router.get('/todos', authMiddleware_1.authenticateToken, todoController_1.getTodos);
router.get('/todos/:id', authMiddleware_1.authenticateToken, todoController_1.getTodoById);
router.put('/todos/:id', authMiddleware_1.authenticateToken, todoController_1.updateTodo);
router.delete('/todos/:id', authMiddleware_1.authenticateToken, todoController_1.deleteTodo);
exports.default = router;
