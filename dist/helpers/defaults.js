"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../constants/common");
exports.default = {
    logger: console,
    catchAsync: function (fn) {
        return function (req, res, next) {
            Promise.resolve(fn(req, res, next)).catch((err) => {
                res.status(common_1.internalServerError).json({
                    code: common_1.RESPONSE_CODE.ERROR,
                    message: err.message,
                    data: {},
                });
            });
        };
    },
    authentication: (_req, _res, next) => {
        return next();
    },
    convertToTz: async (params) => {
        let convertedDate = params === null || params === void 0 ? void 0 : params.date;
        return convertedDate || params;
    },
};
