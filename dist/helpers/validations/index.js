"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSchema = exports.ListSchema = exports.sequence = exports.webVisible = exports.isDefault = exports.activate = exports.UpdateSchema = exports.CreateSchema = void 0;
const create_1 = __importDefault(require("./create"));
exports.CreateSchema = create_1.default;
const update_1 = __importDefault(require("./update"));
exports.UpdateSchema = update_1.default;
const partialUpdate_1 = require("./partialUpdate");
Object.defineProperty(exports, "activate", { enumerable: true, get: function () { return partialUpdate_1.activate; } });
Object.defineProperty(exports, "isDefault", { enumerable: true, get: function () { return partialUpdate_1.isDefault; } });
Object.defineProperty(exports, "webVisible", { enumerable: true, get: function () { return partialUpdate_1.webVisible; } });
Object.defineProperty(exports, "sequence", { enumerable: true, get: function () { return partialUpdate_1.sequence; } });
const list_1 = __importDefault(require("./list"));
exports.ListSchema = list_1.default;
const delete_1 = __importDefault(require("./delete"));
exports.DeleteSchema = delete_1.default;
