const joi = require("joi");

const activate = joi
  .object({
    updatedBy: joi.object().optional(),
    isActive: joi.boolean().optional(),
  })
  .unknown(false);

const isDefault = joi
  .object({
    updatedBy: joi.object().optional(),
    isDefault: joi.boolean().optional(),
  })
  .unknown(false);

const webVisible = joi
  .object({
    updatedBy: joi.object().optional(),
    isWebVisible: joi.boolean().optional(),
  })
  .unknown(false);

const sequence = joi
  .object({
    updatedBy: joi.object().optional(),
    seq: joi.number().optional(),
  })
  .unknown(false);

module.exports = {
  activate,
  isDefault,
  webVisible,
  sequence,
};
