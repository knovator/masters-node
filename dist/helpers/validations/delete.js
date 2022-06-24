"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default
    .object({
    id: joi_1.default.array().items().required(),
    deletedBy: joi_1.default.object().optional(),
    deletedAt: joi_1.default.date().required(),
    updatedBy: joi_1.default.object().optional(),
})
    .unknown(false);
