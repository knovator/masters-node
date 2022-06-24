import joi from "joi";
import Master from "../../models/master";
import { VALIDATION } from "../../constants/common";
import { getDocumentByQuery } from "../../helpers/dbService";

const method = async (value: string) => {
  const result = await getDocumentByQuery(Master, {
    code: value,
  });
  if (result) {
    throw new Error(VALIDATION.MASTER_EXISTS);
  }
  return;
};

export default joi
  .object({
    name: joi.string().required(),
    code: joi
      .string()
      .uppercase()
      .replace(/\s+/g, "_")
      .external(method)
      .required(),
    desc: joi.string().optional(),
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
  .unknown(false);
