import joi from 'joi';

export default joi
  .object({
    name: joi.string().optional(),
    desc: joi.optional(),
    img: joi.string().optional(),
    webDsply: joi.string().optional(),
    isWebVisible: joi.boolean().optional(),
    canDel: joi.boolean().optional(),
    isActive: joi.boolean().optional(),
    isDefault: joi.boolean().optional(),
    seq: joi.number().optional(),
    updatedBy: joi.object().optional(),
  })
  .unknown(false);
