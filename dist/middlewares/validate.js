"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
        });
        if (error) {
            const customErrorMessages = error.details
                .map((d) => {
                if (d.message.includes('is required')) {
                    return `"${d.context?.key}" field is required`;
                }
                if (d.message.includes('is not allowed')) {
                    return `The field "${d.context?.key}" is not allowed.`;
                }
                return null;
            })
                .filter((message) => message !== null);
            return res.status(400).json({
                status: false,
                message: customErrorMessages.join(', '),
            });
        }
        next();
    };
};
exports.default = validate;
