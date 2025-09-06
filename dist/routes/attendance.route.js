"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendance_controller_1 = __importDefault(require("../controllers/attendance.controller"));
const router = express_1.default.Router();
router.get('/', attendance_controller_1.default.list);
router.get('/:id', attendance_controller_1.default.getById);
router.post('/', attendance_controller_1.default.upsert);
router.put('/:id', attendance_controller_1.default.update);
router.delete('/:id', attendance_controller_1.default.delete);
router.get('/reports/attendance', attendance_controller_1.default.attendance);
exports.default = router;
