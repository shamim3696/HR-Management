"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../utils/appError"));
class AuthService {
    async register({ name, email, password }) {
        const existingUser = await (0, db_1.default)('hr_users').where({ email }).first();
        if (existingUser)
            throw new appError_1.default('Email already in use', 409);
        const password_hash = await bcryptjs_1.default.hash(password, 10);
        const [user] = await (0, db_1.default)('hr_users').insert({ name, email, password_hash }).returning(['id', 'email', 'name']);
        return user;
    }
    async login({ email, password }) {
        const user = await (0, db_1.default)('hr_users').where({ email }).first();
        if (!user)
            throw new appError_1.default('Invalid email or password', 401);
        const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isMatch)
            throw new appError_1.default('Invalid email or password', 401);
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return { token };
    }
}
exports.default = new AuthService();
