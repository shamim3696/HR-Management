"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const db_1 = require("./config/db");
const employee_route_1 = __importDefault(require("./routes/employee.route"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const yamljs_1 = __importDefault(require("yamljs"));
const hr_route_1 = __importDefault(require("./routes/hr.route"));
const path_1 = __importDefault(require("path"));
const attendance_route_1 = __importDefault(require("./routes/attendance.route"));
const swaggerDocument = yamljs_1.default.load('./src/utils/swagger.yaml');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// routes
app.use('/api/v1/employees', employee_route_1.default);
app.use('/auth', hr_route_1.default);
app.use('/api/v1/attendance', attendance_route_1.default);
// Serve static files
app.use('/files', express_1.default.static(path_1.default.join(process.cwd(), 'public', 'uploads')));
// Error hander
app.use(globalErrorHandler_1.default);
const startServer = async () => {
    await (0, db_1.checkDbConnection)();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
};
startServer();
