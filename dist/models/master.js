"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const myCustomLabels = {
    totalDocs: "itemCount",
    docs: "data",
    limit: "perPage",
    page: "currentPage",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pageCount",
    pagingCounter: "slNo",
    meta: "paginator",
};
mongoose_paginate_v2_1.default.paginate.options = {
    customLabels: myCustomLabels,
};
const Schema = db_1.default.Schema;
const schema = new Schema({
    name: { type: String, required: true },
    code: { type: String },
    desc: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "master" },
    parentCode: { type: String },
    img: { type: Schema.Types.ObjectId, ref: "file" },
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    seq: { type: Number },
    webDsply: { type: String },
    isWebVisible: { type: Boolean },
    canDel: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: false },
    deletedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
    updatedBy: [{ type: Schema.Types.ObjectId, ref: "user" }],
    deletedBy: { type: Schema.Types.ObjectId, ref: "user" },
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });
schema.pre("save", async function (next) {
    if (this.parentId) {
        const masterData = await db_1.default
            .model("master")
            .findOne({ parentId: this.parentId, deletedAt: { $exists: false } })
            .sort({ createdAt: -1 });
        let number = masterData && masterData.seq ? masterData.seq + 1 : 1;
        if (!this.seq) {
            this.seq = number;
        }
    }
    next();
});
schema.pre("findOne", function (next) {
    this.getQuery().deletedAt = { $exists: false };
    next();
});
schema.pre("find", function (next) {
    this.getQuery().deletedAt = { $exists: false };
    next();
});
schema.plugin(mongoose_paginate_v2_1.default);
schema.method("toJSON", function () {
    var obj = this.toObject();
    delete obj.createdBy;
    delete obj.createdAt;
    delete obj.updatedBy;
    delete obj.updatedAt;
    return obj;
});
const Master = db_1.default.model("master", schema, "master");
exports.default = Master;
