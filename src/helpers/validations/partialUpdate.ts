import joi from 'joi';

export const activate = joi
  .object({
    updatedBy: joi.object().optional(),
    isActive: joi.boolean().optional(),
  })
  .unknown(false);

export const isDefault = joi
  .object({
    updatedBy: joi.object().optional(),
    isDefault: joi.boolean().optional(),
  })
  .unknown(false);

export const webVisible = joi
  .object({
    updatedBy: joi.object().optional(),
    isWebVisible: joi.boolean().optional(),
  })
  .unknown(false);

export const sequence = joi
  .object({
    updatedBy: joi.object().optional(),
    seq: joi.number().optional(),
  })
  .unknown(false);