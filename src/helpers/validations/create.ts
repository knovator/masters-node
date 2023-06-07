import joi from "joi";
import Master from "../../models/Master";
import { VALIDATION } from "../../constants/common";
import { getDocumentByQuery } from "../../helpers/dbService";

export default joi
  .object({
    name: joi.string().required(),
    code: joi
      .string()
      .uppercase()
      .replace(/\s+/g, '_')
      // .external(method)
      .required(),
    extra: joi.string().optional(),
    desc: joi.string().allow('').optional(),
    parentId: joi.string().optional(),
    parentCode: joi.string().optional(),
    img: joi.string().optional(),
    seq: joi.number().optional(),
    isDefault: joi.boolean().optional(),
    webDsply: joi.string().optional(),
    isWebVisible: joi.boolean().optional(),
    canDel: joi.boolean().default(true),
    createdBy: joi.object().optional(),
    updatedBy: joi.object().optional(),
    deletedBy: joi.object().optional(),
    deletedAt: joi.date().optional(),
    isActive: joi.boolean().default(true),
  })
  .custom(async (obj) => {
    const { parentId, code } = obj;
    let search: { code: string; parentId?: string } = { code };
    if (parentId) search.parentId = parentId;
    const result = await getDocumentByQuery(Master, search);
    if (result) {
      throw new Error(VALIDATION.MASTER_EXISTS);
    }
    return obj;
  })
  .unknown(false);
