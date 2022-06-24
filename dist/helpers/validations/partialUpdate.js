"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequence = exports.webVisible = exports.isDefault = exports.activate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.activate = joi_1.default
    .object({
    updatedBy: joi_1.default.object().optional(),
    isActive: joi_1.default.boolean().optional(),
})
    .unknown(false);
exports.isDefault = joi_1.default
    .object({
    updatedBy: joi_1.default.object().optional(),
    isDefault: joi_1.default.boolean().optional(),
})
    .unknown(false);
exports.webVisible = joi_1.default
    .object({
    updatedBy: joi_1.default.object().optional(),
    isWebVisible: joi_1.default.boolean().optional(),
})
    .unknown(false);
exports.sequence = joi_1.default
    .object({
    updatedBy: joi_1.default.object().optional(),
    seq: joi_1.default.number().optional(),
})
    .unknown(false);
