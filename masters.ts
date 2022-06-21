import express from "express";

import validate from "policies/validate";
import * as masterValidation from "helpers/validations";
import * as MasterController from "controllers/masterController";

const routes = express.Router();

routes.post(
  `${routePrefix}/create`,
  authentication,
  validate(masterValidation.CreateSchema),
  MasterController.createMaster
);
// .descriptor("admin.master.create");
routes.put(
  `${routePrefix}/update/:id`,
  authentication,
  validate(masterValidation.UpdateSchema),
  MasterController.updateMaster
);
// .descriptor("admin.master.update");
routes.patch(
  `${routePrefix}/partial-update/activate/:id`,
  authentication,
  validate(masterValidation.activate),
  MasterController.activateMaster
);
// .descriptor("admin.master.active");
routes.patch(
  `${routePrefix}/partial-update/default/:id`,
  authentication,
  validate(masterValidation.isDefault),
  MasterController.defaultMaster
);
// .descriptor("admin.master.default");
routes.patch(
  `${routePrefix}/partial-update/web-visible/:id`,
  authentication,
  validate(masterValidation.webVisible),
  MasterController.webVisibleMaster
);
routes.patch(
  `${routePrefix}/partial-update/sequence/:id`,
  authentication,
  validate(masterValidation.sequence),
  MasterController.sequenceMaster
);
// .descriptor("admin.master.sequence");
routes.put(
  `${routePrefix}/soft-delete`,
  authentication,
  validate(masterValidation.DeleteSchema),
  MasterController.softDeleteMaster
);
// .descriptor("admin.master.softDelete");
routes.post(
  `${routePrefix}/list`,
  authentication,
  validate(masterValidation.ListSchema),
  MasterController.listMaster
);
// .descriptor("admin.master.getAll");

export default routes;
