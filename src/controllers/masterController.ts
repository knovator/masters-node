import {
  createdDocumentResponse,
  successResponse,
  recordNotFound,
} from '../helpers/messages';
import defaults from '../helpers/defaults';

import Master from '../models/Master';
import * as masterService from '../services/master';
import {
  bulkUpdate,
  findOneAndUpdateDocument,
  createDocument,
  getDocumentByQuery,
} from '../helpers/dbService';

const catchAsync = (fn: any) => {
  return defaults.catchAsync(fn);
};

export const createMaster = catchAsync(async (req: any, res: any) => {
  const data = new Master({
    ...req.body,
  });
  if (data.parentId && data.isDefault) {
    await bulkUpdate(
      Master,
      { parentId: data.parentId, isDefault: true },
      { isDefault: false }
    );
  }
  const masterData = await createDocument(Master, data);
  const result = await Master.populate(masterData, [
    { path: 'img', select: 'uri' },
  ]);
  if (result) {
    let section = result.parentCode ? 'submaster' : 'master';
    res.message = req?.i18n?.t(`${section}.create`);
    return createdDocumentResponse(result, res);
  }
});

export const updateMaster = catchAsync(async (req: any, res: any) => {
  const id = req.params.id;
  const data = req.body;
  if (data.isDefault) {
    // checking if data contains isDefault, if contains, reset all defaults
    const masterData: any = await getDocumentByQuery(Master, { _id: id });
    if (masterData.parentId) {
      await bulkUpdate(
        Master,
        { parentId: masterData.parentId, isDefault: true },
        { isDefault: false }
      );
    }
  }
  await findOneAndUpdateDocument(
    Master,
    {
      _id: id,
    },
    data,
    { new: true },
    { path: 'img', select: 'uri' }
  );
  const result = await Master.findOne({ _id: id });
  if (result) {
    let section = result.parentCode ? 'submaster' : 'master';
    res.message = req?.i18n?.t(`${section}.update`);
    return successResponse(result, res);
  }
});

export const activateMaster = catchAsync(async (req: any, res: any) => {
  const id = req.params.id;
  const data = req.body;
  const result: any = await findOneAndUpdateDocument(
    Master,
    {
      _id: id,
    },
    data,
    { new: true },
    { path: 'img', select: 'uri' }
  );
  let section = result.parentCode ? 'submaster' : 'master';
  if (result.isActive) {
    res.message = req?.i18n?.t(`${section}.activate`);
  } else {
    res.message = req?.i18n?.t(`${section}.deactivate`);
  }
  return successResponse(result, res);
});

export const webVisibleMaster = catchAsync(async (req: any, res: any) => {
  const id = req.params.id;
  const data = req.body;
  const result: any = await findOneAndUpdateDocument(
    Master,
    {
      _id: id,
    },
    data,
    { new: true },
    { path: 'img', select: 'uri' }
  );
  let section = result.parentCode ? 'submaster' : 'master';
  if (result.isWebVisible) {
    res.message = req?.i18n?.t(`${section}.display`);
  } else {
    res.message = req?.i18n?.t(`${section}.notDisplay`);
  }
  return successResponse(result, res);
});

export const defaultMaster = catchAsync(async (req: any, res: any) => {
  const result: any = await masterService.defaultMaster(
    req.params.id,
    req.body
  );
  let section = result.parentCode ? 'submaster' : 'master';
  if (result.isDefault) {
    res.message = req?.i18n?.t(`${section}.default`);
  } else {
    res.message = req?.i18n?.t(`${section}.notDefault`);
  }
  return successResponse(result, res);
});

export const sequenceMaster = catchAsync(async (req: any, res: any) => {
  const _result = await masterService.sequenceMaster(req.body.sequences);
  res.message = req?.i18n?.t('submaster.seq');
  return successResponse({}, res);
});

export const deleteMaster = catchAsync(async (req: any, res: any) => {
  const id = req.body.id;
  let isSubmaster = false;
  const master = await Master.findById(id);
  if (!master) {
    res.message = req?.i18n?.t('master.masterNotFound');
    return recordNotFound(res);
  }
  if (master.parentId) {
    isSubmaster = true;
    await Master.updateMany(
      { parentId: master.parentId, seq: { $gt: master.seq } },
      { $inc: { seq: -1 } }
    );
  }
  await Master.deleteOne({ _id: id });
  res.message = req?.i18n?.t(`${isSubmaster ? 'submaster' : 'master'}.delete`);
  return successResponse({}, res);
});

export const listMaster = catchAsync(async (req: any, res: any) => {
  let { page, limit, sort, populate } = req.body.options;
  const isCountOnly = req.body.isCountOnly || false;
  const search = req.body.search || '';
  const customQuery = req.body.query || {};
  let sortMaster = sort ? sort : { seq: 1 };
  let customOptions = {
    ...(page && limit ? { page, limit, sort: sortMaster } : {}),
  };
  let all =
    (typeof req.body.all !== 'undefined' && req.body.all === true) || false;
  let isActive =
    typeof req.body.isActive !== 'undefined'
      ? req.body.isActive || false
      : null;
  const result = await masterService.listMaster(
    customOptions,
    isCountOnly,
    search,
    customQuery,
    isActive === null ? [true, false] : [isActive],
    populate,
    !all
  );
  let section = customQuery.parentCode ? 'submaster' : 'master';
  if (result) {
    res.message = req?.i18n?.t(`${section}.findAll`);
    return successResponse(result, res);
  }
  res.message = req?.i18n?.t(`${section}.notFound`);
  return recordNotFound(res);
});
