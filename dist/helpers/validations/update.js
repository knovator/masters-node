"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default
    .object({
    name: joi_1.default.string().optional(),
    desc: joi_1.default.optional(),
    img: joi_1.default.string().optional(),
    webDsply: joi_1.default.string().optional(),
    isWebVisible: joi_1.default.boolean().optional(),
    canDel: joi_1.default.boolean().optional(),
    isActive: joi_1.default.boolean().optional(),
    isDefault: joi_1.default.boolean().optional(),
    seq: joi_1.default.number().optional(),
    updatedBy: joi_1.default.object().optional(),
})
    .unknown(false);
