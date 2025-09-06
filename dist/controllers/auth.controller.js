"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    async registration(req, res, next) {
        try {
            const user = await auth_service_1.default.register(req.body);
            res.status(201).json({ success: 'true', message: 'HR Profile Created Successfully', data: user });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const result = await auth_service_1.default.login(req.body);
            res.json({ success: 'true', message: 'Login Successfully', token: result });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new AuthController();
