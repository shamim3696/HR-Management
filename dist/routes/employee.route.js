"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const multer_1 = require("../config/multer");
const validate_1 = __importDefault(require("../middlewares/validate"));
const employee_validation_1 = require("../validationRules/employee.validation");
const router = express_1.default.Router();
router.post('/', multer_1.uploadFile, (0, validate_1.default)(employee_validation_1.createEmployeeSchema), employee_controller_1.default.createEmployee);
router.get('/', employee_controller_1.default.getEmployees);
router.get('/:id', employee_controller_1.default.getEmployeeById);
router.patch('/:id', multer_1.uploadFile, employee_controller_1.default.updateEmployeeById);
router.delete('/:id', employee_controller_1.default.deleteEmployeeById);
exports.default = router;
