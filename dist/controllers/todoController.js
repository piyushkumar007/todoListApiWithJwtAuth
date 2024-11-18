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
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description } = req.body;
    try {
        const newTodo = new Todo_1.default({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            title,
            description,
        });
        yield newTodo.save();
        res.status(201).json(newTodo);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const todos = yield Todo_1.default.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        res.status(200).json(todos);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getTodos = getTodos;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const todo = yield Todo_1.default.findOne({ _id: req.params.id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (todo)
            res.status(200).json(todo);
        else
            res.status(404).json({ message: 'Todo not found' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getTodoById = getTodoById;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const updatedTodo = yield Todo_1.default.findOneAndUpdate({ _id: req.params.id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }, req.body, { new: true });
        if (updatedTodo)
            res.status(200).json(updatedTodo);
        else
            res.status(404).json({ message: 'Todo not found' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const deletedTodo = yield Todo_1.default.findOneAndDelete({ _id: req.params.id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (deletedTodo)
            res.status(200).json({ message: 'Todo deleted' });
        else
            res.status(404).json({ message: 'Todo not found' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteTodo = deleteTodo;
