import Joi from 'Joi';

exports.listSchemaKeys = Joi
  .object({
    search: Joi.string().allow("").replace(/\s+/g, "_").default(""),
    query: Joi
      .object({
        parentId: Joi.string().optional(),
        parentCode: Joi.optional(),
        _id: Joi.string().optional(),
      })
      .default({}),
    options: Joi
      .object({
        sort: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
        populate: Joi.array().items().optional(),
        offset: Joi.number().optional(),
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        pagination: Joi.boolean().default(false),
      })
      .default({}),
    isCountOnly: Joi.boolean().default(false),
    isActive: Joi.boolean().optional()
  })
  .unknown(false);
