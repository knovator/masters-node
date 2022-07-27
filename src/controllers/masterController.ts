import {
  failureResponse,
  createdDocumentResponse,
  successResponse,
  recordNotFound,
} from "../helpers/messages";
import defaults from "../helpers/defaults";

import Master from "../models/Master";
import * as masterService from "../services/master";
import {
  bulkUpdate,
  findOneAndUpdateDocument,
  createDocument,
} from "../helpers/dbService";

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
  // let checkCode = await Master.findOne({
  //   code: req.body.code,
  //   deletedAt: { $exists: false },
  // });
  // if (checkCode) {
  //   let message = req?.i18n?.t("master.codeExists");
  //   return failureResponse(message, res);
  // }
  const masterData = await createDocument(Master, data);
  const result = await Master.populate(masterData, [
    { path: "img", select: "uri" },
  ]);
  if (result) {
    res.message = req?.i18n?.t("master.create");
    return createdDocumentResponse(result, res);
  }
});

export const updateMaster = catchAsync(async (req: any, res: any) => {
  const id = req.params.id;
  const data = req.body;
  await findOneAndUpdateDocument(
    Master,
    {
      _id: id,
    },
    data,
    { new: true },
    { path: "img", select: "uri" }
  );
  const result = await Master.findOne({ _id: id });
  if (result) {
    res.message = req?.i18n?.t("master.update");
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
    { path: "img", select: "uri" }
  );
  if (result.isActive) {
    res.message = req?.i18n?.t("master.activate");
  } else {
    res.message = req?.i18n?.t("master.deactivate");
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
    { path: "img", select: "uri" }
  );
  if (result.isWebVisible) {
    res.message = req?.i18n?.t("master.display");
  } else {
    res.message = req?.i18n?.t("master.notDisplay");
  }
  return successResponse(result, res);
});

export const defaultMaster = catchAsync(async (req: any, res: any) => {
  const result: any = await masterService.defaultMaster(
    req.params.id,
    req.body
  );
  if (result.isDefault) {
    res.message = req?.i18n?.t("master.default");
  } else {
    res.message = req?.i18n?.t("master.notDefault");
  }
  return successResponse(result, res);
});

export const sequenceMaster = catchAsync(async (req: any, res: any) => {
  const _result = await masterService.sequenceMaster(req.body.sequences);
  res.message = req?.i18n?.t('master.seq');
  return successResponse({}, res);
});

export const softDeleteMaster = catchAsync(async (req: any, res: any) => {
  const id = req.body.id;
  const data = {
    deletedAt: await defaults.convertToTz({
      tz: process.env.TZ || '',
      date: new Date().toISOString(),
    }),
  };
  const master = await Master.findById(id);
  const result = await bulkUpdate(
    Master,
    {
      _id: { $in: id },
    },
    data
  );
  await Master.updateMany({ seq: { $gt: master?.seq } }, { $inc: { seq: -1 } });
  if (result) {
    res.message = req?.i18n?.t('master.delete');
    return successResponse(result, res);
  }
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
  let all = typeof req.body.all !== 'undefined' || false;
  const result = await masterService.listMaster(
    customOptions,
    isCountOnly,
    search,
    customQuery,
    [true, false],
    populate,
    !all
  );
  if (result) {
    res.message = req?.i18n?.t('master.findAll');
    return successResponse(result, res);
  }
  res.message = req?.i18n?.t('master.masterNotFound');
  return recordNotFound(res);
});
