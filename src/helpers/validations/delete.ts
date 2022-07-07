import joi from "joi";

export default joi
  .object({
    id: joi.array().items().required(),
    updatedBy: joi.object().optional(),
    deletedBy: joi.object().optional(),
    deletedAt: joi.date().optional(),
  })
  .unknown(false);
