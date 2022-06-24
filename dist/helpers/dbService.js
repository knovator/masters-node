"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDocuments = exports.countDocument = exports.getDocumentByQuery = exports.createDocument = exports.findOneAndUpdateDocument = exports.bulkUpdate = void 0;
const bulkUpdate = (model, filter, data) => new Promise((resolve, reject) => {
    model.updateMany(filter, data, (err, result) => {
        if (result !== undefined) {
            resolve(result);
        }
        else {
            reject(err);
        }
    });
});
exports.bulkUpdate = bulkUpdate;
const findOneAndUpdateDocument = (model, filter, data, options = { new: true }, populate = {}) => new Promise((resolve, reject) => {
    model
        .findOneAndUpdate(filter, data, options, (err, result) => {
        if (err)
            reject(err);
        else
            resolve(result);
    })
        .populate(populate);
});
exports.findOneAndUpdateDocument = findOneAndUpdateDocument;
const createDocument = (model, data) => new Promise((resolve, reject) => {
    model.create(data, (err, result) => {
        if (err)
            reject(err);
        else
            resolve(result);
    });
});
exports.createDocument = createDocument;
const getDocumentByQuery = (model, where, select = []) => new Promise((resolve, reject) => {
    model.findOne(where, select, (err, data) => {
        if (err)
            reject(err);
        else
            resolve(data);
    });
});
exports.getDocumentByQuery = getDocumentByQuery;
const countDocument = (model, where) => new Promise((resolve, reject) => {
    model.where(where).countDocuments((err, result) => {
        if (result !== undefined) {
            resolve(result);
        }
        else {
            reject(err);
        }
    });
});
exports.countDocument = countDocument;
const getAllDocuments = (model, query, options) => new Promise((resolve, reject) => {
    model.paginate(query, options, (err, data) => {
        if (err)
            reject(err);
        else
            resolve(data);
    });
});
exports.getAllDocuments = getAllDocuments;
