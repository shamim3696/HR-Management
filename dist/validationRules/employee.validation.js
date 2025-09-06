"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEmployeeSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(2).max(100).required(),
    age: joi_1.default.number().integer().min(18).max(65).required(),
    designation: joi_1.default.string().trim().required(),
    hiring_date: joi_1.default.date().required(),
    date_of_birth: joi_1.default.date().less('now').required(),
    salary: joi_1.default.number().precision(2).positive().required(),
    photo_path: joi_1.default.string().optional(),
});
