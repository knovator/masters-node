import joi from 'joi';

export default joi
  .object({
    language: joi.string().optional(),
    search: joi.string().allow('').default(''),
    query: joi
      .object({
        parentId: joi.string().optional(),
        parentCode: joi.optional(),
        _id: joi.string().optional(),
        extra: joi.string().optional(),
      })
      .default({}),
    options: joi
      .object({
        sort: joi.alternatives().try(joi.object(), joi.string()).optional(),
        populate: joi.array().items().optional(),
        offset: joi.number().optional(),
        page: joi.number().optional(),
        limit: joi.number().optional(),
        pagination: joi.boolean().default(false),
      })
      .default({}),
    isCountOnly: joi.boolean().default(false),
    isActive: joi.boolean().optional(),
    all: joi.boolean().optional(),
    createdBy: joi.object().optional(),
  })
  .unknown(false);
