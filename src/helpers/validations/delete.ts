import joi from "joi";

export default joi
  .object({
    id: joi.array().items().required(),
    deletedBy: joi.object().optional(),
  })
  .unknown(false);
