"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMaster = exports.sequenceMaster = exports.defaultMaster = void 0;
const master_1 = __importDefault(require("../models/master"));
const dbService_1 = require("../helpers/dbService");
const defaultMaster = async (id, data) => {
    try {
        const masterData = await (0, dbService_1.getDocumentByQuery)(master_1.default, { _id: id });
        if (masterData.parentId) {
            await (0, dbService_1.bulkUpdate)(master_1.default, { parentId: masterData.parentId, isDefault: true }, { isDefault: false });
        }
        const result = await (0, dbService_1.findOneAndUpdateDocument)(master_1.default, {
            _id: id,
        }, data, { new: true }, { path: "img", select: "uri" });
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.defaultMaster = defaultMaster;
const sequenceMaster = async (id, data) => {
    try {
        const masterData = await (0, dbService_1.getDocumentByQuery)(master_1.default, { _id: id });
        if ((masterData === null || masterData === void 0 ? void 0 : masterData.seq) > data.seq && masterData.parentId) {
            await (0, dbService_1.bulkUpdate)(master_1.default, {
                seq: { $gte: data.seq, $lt: masterData.seq },
                parentId: masterData.parentId,
            }, { $inc: { seq: 1 } });
        }
        else if ((masterData === null || masterData === void 0 ? void 0 : masterData.seq) <= data.seq && masterData.parentId) {
            await (0, dbService_1.bulkUpdate)(master_1.default, {
                seq: { $gt: masterData.seq, $lte: data.seq },
                parentId: masterData.parentId,
            }, { $inc: { seq: -1 } });
        }
        const result = await (0, dbService_1.findOneAndUpdateDocument)(master_1.default, { _id: id }, data, { new: true }, { path: "img", select: "uri" });
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.sequenceMaster = sequenceMaster;
const listMaster = async (customOptions, isCountOnly, search, customQuery, onlyActive = [true]) => {
    try {
        let query = {
            deletedAt: { $exists: false },
            isActive: { $in: onlyActive },
            $or: [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    code: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ],
        };
        let options = {
            select: [],
            collation: "",
            customLabels: {},
            useEstimatedCount: true,
            useCustomCountFn: true,
            forceCountFn: true,
            read: {},
            options: {},
            projection: "",
            lean: true,
            leanWithId: true,
        };
        if (customQuery.parentCode) {
            if (Array.isArray(customQuery.parentCode)) {
                Object.assign(query, { parentCode: { $in: customQuery.parentCode } });
            }
            else {
                Object.assign(query, { parentCode: customQuery.parentCode });
            }
        }
        else {
            Object.assign(query, { parentId: { $exists: false } });
        }
        let result;
        if (isCountOnly) {
            result = await (0, dbService_1.countDocument)(master_1.default, query);
            result = { totalRecords: result };
            return result;
        }
        else {
            if (options !== undefined) {
                options = {
                    ...options,
                    ...customOptions,
                };
            }
            result = await (0, dbService_1.getAllDocuments)(master_1.default, query, options);
            if (!result) {
                return false;
            }
            return result;
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.listMaster = listMaster;
