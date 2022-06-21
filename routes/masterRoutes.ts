import express from "express";
import defaults from "helpers/defaults";

import validate from "policies/validate";
import * as masterValidation from "helpers/validations";
import * as MasterController from "controllers/masterController";

const routes = express.Router();
routes.use(express.json());

const authenticate = (req: any, res: any, next: any) => {
  return defaults.authentication(req, res, next);
};

routes.post(
  `/create`,
  authenticate,
  validate(masterValidation.CreateSchema),
  MasterController.createMaster
);
// .descriptor("admin.master.create");
routes.put(
  `/update/:id`,
  authenticate,
  validate(masterValidation.UpdateSchema),
  MasterController.updateMaster
);
// .descriptor("admin.master.update");
routes.patch(
  `/partial-update/activate/:id`,
  authenticate,
  validate(masterValidation.activate),
  MasterController.activateMaster
);
// .descriptor("admin.master.active");
routes.patch(
  `/partial-update/default/:id`,
  authenticate,
  validate(masterValidation.isDefault),
  MasterController.defaultMaster
);
// .descriptor("admin.master.default");
routes.patch(
  `/partial-update/web-visible/:id`,
  authenticate,
  validate(masterValidation.webVisible),
  MasterController.webVisibleMaster
);
routes.patch(
  `/partial-update/sequence/:id`,
  authenticate,
  validate(masterValidation.sequence),
  MasterController.sequenceMaster
);
// .descriptor("admin.master.sequence");
routes.put(
  `/soft-delete`,
  authenticate,
  validate(masterValidation.DeleteSchema),
  MasterController.softDeleteMaster
);
// .descriptor("admin.master.softDelete");
routes.post(
  `/list`,
  authenticate,
  validate(masterValidation.ListSchema),
  MasterController.listMaster
);
// .descriptor("admin.master.getAll");

export default routes;
