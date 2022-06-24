"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationError = exports.internalServerError = exports.create = exports.success = exports.RESPONSE_CODE = exports.VALIDATION = void 0;
exports.VALIDATION = {
    MASTER_EXISTS: "Master exists",
};
exports.RESPONSE_CODE = {
    DEFAULT: "SUCCESS",
    ERROR: "ERROR",
};
exports.success = 200;
exports.create = 201;
exports.internalServerError = 500;
exports.validationError = 422;
