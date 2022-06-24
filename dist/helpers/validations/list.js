"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default
    .object({
    search: joi_1.default.string().allow("").replace(/\s+/g, "_").default(""),
    query: joi_1.default
        .object({
        parentId: joi_1.default.string().optional(),
        parentCode: joi_1.default.optional(),
        _id: joi_1.default.string().optional(),
    })
        .default({}),
    options: joi_1.default
        .object({
        sort: joi_1.default.alternatives().try(joi_1.default.object(), joi_1.default.string()).optional(),
        populate: joi_1.default.array().items().optional(),
        offset: joi_1.default.number().optional(),
        page: joi_1.default.number().optional(),
        limit: joi_1.default.number().optional(),
        pagination: joi_1.default.boolean().default(false),
    })
        .default({}),
    isCountOnly: joi_1.default.boolean().default(false),
    isActive: joi_1.default.boolean().optional()
})
    .unknown(false);
