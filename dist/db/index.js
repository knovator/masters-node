"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const defaults_1 = __importDefault(require("../helpers/defaults"));
const path = require("path");
const dotenv = require("dotenv");
const data = path.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename);
dotenv.config({ path: path.join(data, ".env") });
const dbConfigure = process.env.DB_USERNAME && process.env.DB_PASSWORD
    ? `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`
    : "";
const dConnection = `${process.env.DB_CONNECTION}://${dbConfigure}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
mongoose_1.default
    .connect(dConnection)
    .then(async () => { })
    .catch((err) => {
    defaults_1.default.logger.error("DB Error", err);
});
exports.default = mongoose_1.default;
