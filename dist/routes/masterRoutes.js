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
const express_1 = __importDefault(require("express"));
const defaults_1 = __importDefault(require("../helpers/defaults"));
const validate_1 = __importDefault(require("../policies/validate"));
const masterValidation = __importStar(require("../helpers/validations"));
const MasterController = __importStar(require("../controllers/masterController"));
const routes = express_1.default.Router();
routes.use(express_1.default.json());
const authenticate = (req, res, next) => {
    return defaults_1.default.authentication(req, res, next);
};
routes.post(`/create`, authenticate, (0, validate_1.default)(masterValidation.CreateSchema), MasterController.createMaster);
routes.put(`/update/:id`, authenticate, (0, validate_1.default)(masterValidation.UpdateSchema), MasterController.updateMaster);
routes.patch(`/partial-update/activate/:id`, authenticate, (0, validate_1.default)(masterValidation.activate), MasterController.activateMaster);
routes.patch(`/partial-update/default/:id`, authenticate, (0, validate_1.default)(masterValidation.isDefault), MasterController.defaultMaster);
routes.patch(`/partial-update/web-visible/:id`, authenticate, (0, validate_1.default)(masterValidation.webVisible), MasterController.webVisibleMaster);
routes.patch(`/partial-update/sequence/:id`, authenticate, (0, validate_1.default)(masterValidation.sequence), MasterController.sequenceMaster);
routes.put(`/soft-delete`, authenticate, (0, validate_1.default)(masterValidation.DeleteSchema), MasterController.softDeleteMaster);
routes.post(`/list`, authenticate, (0, validate_1.default)(masterValidation.ListSchema), MasterController.listMaster);
exports.default = routes;
