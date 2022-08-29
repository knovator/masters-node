import express from 'express';
require('express-list-endpoints-descriptor')(express);
import defaults from '../helpers/defaults';
import { IRouter } from '../../types/Router';

import validate from '../policies/validate';
import * as masterValidation from '../helpers/validations';
import * as MasterController from '../controllers/masterController';

const routes: IRouter = express.Router();

routes.use(express.json());

const authenticate = (req: any, res: any, next: any) => {
  return defaults.authentication(req, res, next);
};

routes
  .post(
    `/create`,
    authenticate,
    validate(masterValidation.CreateSchema),
    MasterController.createMaster
  )
  .descriptor('master.create');
routes
  .put(
    `/update/:id`,
    authenticate,
    validate(masterValidation.UpdateSchema),
    MasterController.updateMaster
  )
  .descriptor('master.update');
routes
  .patch(
    `/partial-update/activate/:id`,
    authenticate,
    validate(masterValidation.activate),
    MasterController.activateMaster
  )
  .descriptor('master.active');
routes
  .patch(
    `/partial-update/default/:id`,
    authenticate,
    validate(masterValidation.isDefault),
    MasterController.defaultMaster
  )
  .descriptor('master.default');
routes
  .patch(
    `/partial-update/web-visible/:id`,
    authenticate,
    validate(masterValidation.webVisible),
    MasterController.webVisibleMaster
  )
  .descriptor('master.webVisible');
routes
  .patch(
    `/partial-update/sequence`,
    authenticate,
    validate(masterValidation.sequence),
    MasterController.sequenceMaster
  )
  .descriptor('master.sequence');
routes
  .put(
    `/delete`,
    authenticate,
    validate(masterValidation.DeleteSchema),
    MasterController.deleteMaster
  )
  .descriptor('master.softDelete');
routes
  .post(
    `/list`,
    authenticate,
    validate(masterValidation.ListSchema),
    MasterController.listMaster
  )
  .descriptor('master.list');

export default routes;
