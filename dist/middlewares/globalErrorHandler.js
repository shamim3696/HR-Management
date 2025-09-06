"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const appError_1 = __importDefault(require("../utils/appError"));
const errorHandler = (err, req, res, next) => {
    console.error('[🔥 Error]', err);
    // Joi Validation Error
    if (err.isJoi || err instanceof joi_1.default.ValidationError) {
        return res.status(400).json({
            status: false,
            message: err.details?.[0]?.message || 'Validation error',
        });
    }
    // PostgreSQL Error Handling
    if (err.code) {
        switch (err.code) {
            case '23505':
                // Unique violation
                return res.status(409).json({
                    status: false,
                    message: 'Duplicate entry, this data already exists.',
                });
            case '23503':
                // Foreign key violation
                return res.status(400).json({
                    status: false,
                    message: 'Foreign key constraint violation.',
                });
            case '22001':
                // String data too long for a column
                return res.status(400).json({
                    status: false,
                    message: 'Data too long for the specified column.',
                });
            case '23XXX':
                // Integrity constraint violation (like NOT NULL or UNIQUE)
                return res.status(400).json({
                    status: false,
                    message: 'Integrity constraint violation.',
                });
            case '42601':
                // Syntax error in SQL
                return res.status(400).json({
                    status: false,
                    message: 'Syntax error in SQL query.',
                });
            case '57014':
                // Query timeout
                return res.status(408).json({
                    status: false,
                    message: 'Query timed out, please try again later.',
                });
            default:
                return res.status(500).json({
                    status: false,
                    message: 'Database error: ' + err.message,
                });
        }
    }
    // Custom Application Error (AppError)
    if (err instanceof appError_1.default) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
        });
    }
    // Fallback (Unknown error)
    return res.status(500).json({
        status: false,
        message: 'Something went wrong!',
    });
};
exports.default = errorHandler;
