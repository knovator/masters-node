import joi from "joi";
import("db");
// const Master = require("../../../../models/master");
// const { VALIDATION } = require("constants/common");

// const method = async (value) => {
//   const result = await dbService.getDocumentByQuery(Master, {
//     code: value,
//   });
//   if (result) {
//     throw new Error(VALIDATION.MASTER_EXISTS);
//   }
//   return;
// };

export default joi
  .object({
    name: joi.string().required(),
    code: joi
      .string()
      .uppercase()
      .replace(/\s+/g, "_")
      // .external(method)
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
