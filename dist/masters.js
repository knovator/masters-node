"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.masters = void 0;
const defaults_1 = __importDefault(require("./helpers/defaults"));
const masterRoutes_1 = __importDefault(require("./routes/masterRoutes"));
function masters({ convertToTz, authentication, logger, catchAsync, } = defaults_1.default) {
    if (typeof catchAsync === "function")
        defaults_1.default.catchAsync = catchAsync;
    if (typeof convertToTz === "function")
        defaults_1.default.convertToTz = convertToTz;
    if (typeof authentication === "function")
        defaults_1.default.authentication = authentication;
    if (typeof logger === "function")
        defaults_1.default.logger = logger;
    return masterRoutes_1.default;
}
exports.masters = masters;
