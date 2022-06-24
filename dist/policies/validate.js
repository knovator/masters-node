"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../helpers/messages");
const defaults_1 = __importDefault(require("../helpers/defaults"));
const validate = (validator) => {
    return async function (req, res, next) {
        try {
            req.body = await validator.validateAsync(req.body);
            next();
        }
        catch (err) {
            defaults_1.default.logger.error("ValidationError", err);
            if (err.isJoi)
                return (0, messages_1.inValidParam)(err.message, res);
            next((0, messages_1.failureResponse)(err.message, res));
        }
    };
};
exports.default = validate;
