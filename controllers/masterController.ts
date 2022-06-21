import {
  failureResponse,
  createdDocumentResponse,
  successResponse,
  recordNotFound,
} from "helpers/messages";
import { convertToTz } from "services/timezone";

import Master from "models/master";
import * as masterService from "services/master";
import {
  bulkUpdate,
  findOneAndUpdateDocument,
  createDocument,
} from "helpers/dbService";

export const createMaster = catchAsync(async (req: any, res: any) => {
  try {
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
    let checkCode = await Master.findOne({
      code: req.body.code,
      deletedAt: { $exists: false },
    });
    if (checkCode) {
      let message = req?.i18n?.t("master.codeExists");
      return failureResponse(message, res);
    }
    const masterData = await createDocument(Master, data);
    const result = await Master.populate(masterData, [
      { path: "img", select: "uri" },
    ]);
    if (result) {
      res.message = req?.i18n?.t("master.create");
      return createdDocumentResponse(result, res);
    }
  } catch (error) {
    logger.error("CreateMaster Error", error);
  }
});

export const updateMaster = catchAsync(async (req: any, res: any) => {
  try {
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
  } catch (error) {
    logger.error("UpdateMaster Error", error);
  }
});

export const activateMaster = catchAsync(async (req: any, res: any) => {
  try {
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
  } catch (error) {
    logger.error("ActivateMasterError", error);
  }
});

export const webVisibleMaster = catchAsync(async (req: any, res: any) => {
  try {
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
  } catch (error) {
    logger.error("WebVisibleMaster Error", error);
  }
});

export const defaultMaster = catchAsync(async (req: any, res: any) => {
  try {
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
  } catch (error) {
    logger.error("DefaultMaster Error", error);
  }
});

export const sequenceMaster = catchAsync(async (req: any, res: any) => {
  try {
    const result = await masterService.sequenceMaster(req.params.id, req.body);
    res.message = req?.i18n?.t("master.seq");
    return successResponse(result, res);
  } catch (error) {
    logger.error("UpdateSequence Error", error);
  }
});

export const softDeleteMaster = catchAsync(async (req: any, res: any) => {
  try {
    const id = req.body.id;
    const data = {
      deletedAt: await convertToTz({ tz: process.env.TZ, date: new Date() }),
    };
    const master = await Master.findById(id);
    const result = await bulkUpdate(
      Master,
      {
        _id: { $in: id },
      },
      data
    );
    await Master.updateMany(
      { seq: { $gt: master.seq } },
      { $inc: { seq: -1 } }
    );
    if (result) {
      res.message = req?.i18n?.t("master.delete");
      return successResponse(result, res);
    }
  } catch (error) {
    logger.error("SoftDelete Error", error);
  }
});

export const listMaster = catchAsync(async (req: any, res: any) => {
  try {
    let { page, limit, sort } = req.body.options;
    const isCountOnly = req.body.isCountOnly || false;
    const search = req.body.search || "";
    const customQuery = req.body.query || {};
    let sortMaster = sort ? sort : { seq: 1 };
    let customOptions = {
      ...(page && limit ? { page, limit, sort: sortMaster } : {}),
    };
    const result = await masterService.listMaster(
      customOptions,
      isCountOnly,
      search,
      customQuery,
      [true, false]
    );
    if (result) {
      res.message = req?.i18n?.t("master.findAll");
      return successResponse(result, res);
    }
    res.message = req?.i18n?.t("master.masterNotFound");
    return recordNotFound(res);
  } catch (error) {
    logger.error("ListMaster Error", error);
  }
});
