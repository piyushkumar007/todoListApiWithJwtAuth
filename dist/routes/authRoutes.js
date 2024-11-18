"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = require("../utils/asyncHandler");
const authController_1 = require("../controllers/authController");
const authController_2 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/register', authController_1.register);
router.post('/login', (0, asyncHandler_1.asyncHandler)(authController_2.login));
exports.default = router;
