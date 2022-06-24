"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMaster = exports.softDeleteMaster = exports.sequenceMaster = exports.defaultMaster = exports.webVisibleMaster = exports.activateMaster = exports.updateMaster = exports.createMaster = void 0;
const messages_1 = require("../helpers/messages");
const defaults_1 = __importDefault(require("../helpers/defaults"));
const master_1 = __importDefault(require("../models/master"));
const masterService = __importStar(require("../services/master"));
const dbService_1 = require("../helpers/dbService");
const catchAsync = (fn) => {
    return defaults_1.default.catchAsync(fn);
};
exports.createMaster = catchAsync(async (req, res) => {
    var _a, _b;
    const data = new master_1.default({
        ...req.body,
    });
    if (data.parentId && data.isDefault) {
        await (0, dbService_1.bulkUpdate)(master_1.default, { parentId: data.parentId, isDefault: true }, { isDefault: false });
    }
    let checkCode = await master_1.default.findOne({
        code: req.body.code,
        deletedAt: { $exists: false },
    });
    if (checkCode) {
        let message = (_a = req === null || req === void 0 ? void 0 : req.i18n) === null || _a === void 0 ? void 0 : _a.t("master.codeExists");
        return (0, messages_1.failureResponse)(message, res);
    }
    const masterData = await (0, dbService_1.createDocument)(master_1.default, data);
    const result = await master_1.default.populate(masterData, [
        { path: "img", select: "uri" },
    ]);
    if (result) {
        res.message = (_b = req === null || req === void 0 ? void 0 : req.i18n) === null || _b === void 0 ? void 0 : _b.t("master.create");
        return (0, messages_1.createdDocumentResponse)(result, res);
    }
});
exports.updateMaster = catchAsync(async (req, res) => {
    var _a;
    const id = req.params.id;
    const data = req.body;
    await (0, dbService_1.findOneAndUpdateDocument)(master_1.default, {
        _id: id,
    }, data, { new: true }, { path: "img", select: "uri" });
    const result = await master_1.default.findOne({ _id: id });
    if (result) {
        res.message = (_a = req === null || req === void 0 ? void 0 : req.i18n) === null || _a === void 0 ? void 0 : _a.t("master.update");
        return (0, messages_1.successResponse)(result, res);
    }
});
exports.activateMaster = catchAsync(async (req, res) => {
    var _a, _b;
    const id = req.params.id;
    const data = req.body;
    const result = await (0, dbService_1.findOneAndUpdateDocument)(master_1.default, {
        _id: id,
    }, data, { new: true }, { path: "img", select: "uri" });
    if (result.isActive) {
        res.message = (_a = req === null || req === void 0 ? void 0 : req.i18n) === null || _a === void 0 ? void 0 : _a.t("master.activate");
    }
    else {
        res.message = (_b = req === null || req === void 0 ? void 0 : req.i18n) === null || _b === void 0 ? void 0 : _b.t("master.deactivate");
    }
    return (0, messages_1.successResponse)(result, res);
});
exports.webVisibleMaster = catchAsync(async (req, res) => {
    var _a, _b;
    const id = req.params.id;
    const data = req.body;
    const result = await (0, dbService_1.findOneAndUpdateDocument)(master_1.default, {
        _id: id,
    }, data, { new: true }, { path: "img", select: "uri" });
    if (result.isWebVisible) {
        res.message = (_a = req === null || req === void 0 ? void 0 : req.i18n) === null || _a === void 0 ? void 0 : _a.t("master.display");
    }
    else {
        res.message = (_b = req === null || req === void 0 ? void 0 : req.i18n) === null || _b === void 0 ? void 0 : _b.t("master.notDisplay");
    }
    return (0, messages_1.successResponse)(result, res);
});
exports.defaultMaster = catchAsync(async (req, res) => {
    var _a, _b;
    const result = await masterService.defaultMaster(req.params.id, req.body);
    if (result.isDefault) {
        res.message = (_a = req === null || req === void 0 ? void 0 : req.i18n) === null || _a === void 0 ? void 0 : _a.t("master.default");
    }
    else {
        res.message = (_b = req === null || req === void 0 ? void 0 : req.i18n) === null || _b === void 0 ? void 0 : _b.t("master.notDefault");
    }
    return (0, messages_1.successResponse)(result, res);
});
exports.sequenceMaster = catchAsync(async (req, res) => {
    var _a;
    const result = await masterService.sequenceMaster(req.params.id, req.body);
    res.message = (_a = req === null || req === void 0 ? void 0 : req.i18n) === null || _a === void 0 ? void 0 : _a.t("master.seq");
    return (0, messages_1.successResponse)(result, res);
});
exports.softDeleteMaster = catchAsync(async (req, res) => {
    var _a;
    const id = req.body.id;
    const data = {
        deletedAt: await defaults_1.default.convertToTz({
            tz: process.env.TZ,
            date: new Date(),
        }),
    };
    const master = await master_1.default.findById(id);
    const result = await (0, dbService_1.bulkUpdate)(master_1.default, {
        _id: { $in: id },
    }, data);
    await master_1.default.updateMany({ seq: { $gt: master.seq } }, { $inc: { seq: -1 } });
    if (result) {
        res.message = (_a = req === null || req === void 0 ? void 0 : req.i18n) === null || _a === void 0 ? void 0 : _a.t("master.delete");
        return (0, messages_1.successResponse)(result, res);
    }
});
exports.listMaster = catchAsync(async (req, res) => {
    var _a, _b;
    let { page, limit, sort } = req.body.options;
    const isCountOnly = req.body.isCountOnly || false;
    const search = req.body.search || "";
    const customQuery = req.body.query || {};
    let sortMaster = sort ? sort : { seq: 1 };
    let customOptions = {
        ...(page && limit ? { page, limit, sort: sortMaster } : {}),
    };
    const result = await masterService.listMaster(customOptions, isCountOnly, search, customQuery, [true, false]);
    if (result) {
        res.message = (_a = req === null || req === void 0 ? void 0 : req.i18n) === null || _a === void 0 ? void 0 : _a.t("master.findAll");
        return (0, messages_1.successResponse)(result, res);
    }
    res.message = (_b = req === null || req === void 0 ? void 0 : req.i18n) === null || _b === void 0 ? void 0 : _b.t("master.masterNotFound");
    return (0, messages_1.recordNotFound)(res);
});
