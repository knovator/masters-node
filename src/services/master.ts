import Master from "../models/Master";
import {
  getDocumentByQuery,
  bulkUpdate,
  findOneAndUpdateDocument,
  countDocument,
  getAllDocuments,
} from "../helpers/dbService";
import { UpdateQuery } from "mongoose";

export const defaultMaster = async (id: string, data: UpdateQuery<MasterType>) => {
  try {
    const masterData: any = await getDocumentByQuery(Master, { _id: id });
    if (masterData.parentId) {
      await bulkUpdate(
        Master,
        { parentId: masterData.parentId, isDefault: true },
        { isDefault: false }
      );
    }
    const result = await findOneAndUpdateDocument(
      Master,
      {
        _id: id,
      },
      data,
      { new: true },
      { path: 'img', select: 'uri' }
    );
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const sequenceMaster = async (id: any, data: UpdateQuery<MasterType>) => {
  try {
    const masterData: any = await getDocumentByQuery(Master, { _id: id });
    if (masterData?.seq > data.seq && masterData.parentId) {
      await bulkUpdate(
        Master,
        {
          seq: { $gte: data.seq, $lt: masterData.seq },
          parentId: masterData.parentId,
        },
        { $inc: { seq: 1 } }
      );
    } else if (masterData?.seq <= data.seq && masterData.parentId) {
      await bulkUpdate(
        Master,
        {
          seq: { $gt: masterData.seq, $lte: data.seq },
          parentId: masterData.parentId,
        },
        { $inc: { seq: -1 } }
      );
    }
    const result = await findOneAndUpdateDocument(
      Master,
      { _id: id },
      data,
      { new: true },
      { path: 'img', select: 'uri' }
    );
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const listMaster = async (
  customOptions: any,
  isCountOnly: any,
  search: any,
  customQuery: any,
  onlyActive = [true],
  populate = []
) => {
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
      populate: Array.isArray(populate) ? populate : [],
    };
    if (customQuery.parentCode) {
      if (Array.isArray(customQuery.parentCode)) {
        Object.assign(query, { parentCode: { $in: customQuery.parentCode } });
      } else {
        Object.assign(query, { parentCode: customQuery.parentCode });
      }
    } else {
      Object.assign(query, { parentCode: { $exists: false } });
    }
    let result;
    if (isCountOnly) {
      result = await countDocument(Master, query);
      result = { totalRecords: result };
      return result;
    } else {
      if (options !== undefined) {
        options = {
          ...options,
          ...customOptions,
        };
      }
      // @ts-ignore
      result = await getAllDocuments(Master, query, options);
      if (!result) {
        return false;
      }
      return result;
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
