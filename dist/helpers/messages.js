"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inValidParam = exports.recordNotFound = exports.createdDocumentResponse = exports.successResponse = exports.failureResponse = void 0;
const common_1 = require("../constants/common");
const failureResponse = (data, res) => {
    let i = 0;
    if (data.name === "ValidationError") {
        Object.keys(data.errors).forEach((key) => {
            if (i !== 1) {
                data.message = data.errors[key].message;
            }
            i++;
        });
    }
    res.message = data.message;
    return res.status(common_1.validationError).json({
        code: common_1.RESPONSE_CODE.ERROR,
        message: data.message ? data.message : data,
    });
};
exports.failureResponse = failureResponse;
const successResponse = (data, res) => {
    return res.status(common_1.success).json({
        code: common_1.RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: data,
    });
};
exports.successResponse = successResponse;
const createdDocumentResponse = (data, res) => {
    return res.status(common_1.create).json({
        code: common_1.RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: data,
    });
};
exports.createdDocumentResponse = createdDocumentResponse;
const recordNotFound = (res) => {
    return res.status(common_1.success).json({
        code: common_1.RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: {},
    });
};
exports.recordNotFound = recordNotFound;
const inValidParam = (message, res) => {
    message = message.replace(/\"/g, "");
    res.message = message;
    return res.status(common_1.validationError).json({
        code: common_1.RESPONSE_CODE.ERROR,
        message: message,
        data: {},
    });
};
exports.inValidParam = inValidParam;
