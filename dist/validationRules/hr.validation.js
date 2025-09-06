"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hrUserLoginSchema = exports.hrUserCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.hrUserCreateSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
    }),
    name: joi_1.default.string().min(2).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters long',
    }),
});
exports.hrUserLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email address',
    }),
    password: joi_1.default.string().required().messages({
        'string.empty': 'Password is required',
    }),
});
