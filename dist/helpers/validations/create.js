"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const master_1 = __importDefault(require("../../models/master"));
const common_1 = require("../../constants/common");
const dbService_1 = require("../../helpers/dbService");
const method = async (value) => {
    const result = await (0, dbService_1.getDocumentByQuery)(master_1.default, {
        code: value,
    });
    if (result) {
        throw new Error(common_1.VALIDATION.MASTER_EXISTS);
    }
    return;
};
exports.default = joi_1.default
    .object({
    name: joi_1.default.string().required(),
    code: joi_1.default
        .string()
        .uppercase()
        .replace(/\s+/g, "_")
        .external(method)
        .required(),
    desc: joi_1.default.string().optional(),
    parentId: joi_1.default.string().optional(),
    parentCode: joi_1.default.string().optional(),
    img: joi_1.default.string().optional(),
    seq: joi_1.default.number().optional(),
    isDefault: joi_1.default.boolean().optional(),
    webDsply: joi_1.default.string().optional(),
    isWebVisible: joi_1.default.boolean().optional(),
    canDel: joi_1.default.boolean().default(true),
    createdBy: joi_1.default.object().optional(),
    updatedBy: joi_1.default.object().optional(),
    deletedBy: joi_1.default.object().optional(),
    deletedAt: joi_1.default.date().optional(),
    isActive: joi_1.default.boolean().default(true),
})
    .unknown(false);
