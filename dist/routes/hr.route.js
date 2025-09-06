"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const hr_validation_1 = require("../validationRules/hr.validation");
const router = express_1.default.Router();
router.post('/', (0, validate_1.default)(hr_validation_1.hrUserCreateSchema), auth_controller_1.default.registration);
router.post('/login', (0, validate_1.default)(hr_validation_1.hrUserLoginSchema), auth_controller_1.default.login);
exports.default = router;
