"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class BaseRepository {
    constructor(tableName) {
        this.tableName = tableName;
    }
    findAll() {
        return (0, db_1.default)(this.tableName).select('*');
    }
    findById(id) {
        return (0, db_1.default)(this.tableName)
            .where({ id })
            .first()
            .select('id', 'name', 'age', 'designation', 'hiring_date', 'date_of_birth', 'salary', 'photo_path');
    }
    create(data) {
        return (0, db_1.default)(this.tableName).insert(data).returning('*');
    }
    update(id, data) {
        return (0, db_1.default)(this.tableName)
            .where({ id })
            .update(data)
            .returning(['id', 'name', 'age', 'designation', 'hiring_date', 'date_of_birth', 'salary', 'photo_path']);
    }
    delete(id) {
        return (0, db_1.default)(this.tableName).where({ id }).del();
    }
    findWhere(where) {
        return (0, db_1.default)(this.tableName).where(where);
    }
    findOneWhere(where) {
        return (0, db_1.default)(this.tableName).where(where).first();
    }
}
exports.default = BaseRepository;
