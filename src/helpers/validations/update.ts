import joi from 'joi';

export default joi
  .object({
    name: joi.string().optional(),
    desc: joi.optional(),
    names: joi.object().optional(),
    img: joi.string().optional().allow(null).allow(''),
    webDsply: joi.string().allow('').optional(),
    isWebVisible: joi.boolean().optional(),
    canDel: joi.boolean().optional(),
    canEdit: joi.boolean().optional(),
    isActive: joi.boolean().optional(),
    isDefault: joi.boolean().optional(),
    seq: joi.number().optional(),
    updatedBy: joi.object().optional(),
    extra: joi.string().optional(),
  })
  .unknown(false);
