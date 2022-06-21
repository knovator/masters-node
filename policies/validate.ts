import { inValidParam, failureResponse } from "helpers/messages";

const validate = (validator: any) => {
  return async function (req: any, res: any, next: any) {
    try {
      req.body = await validator.validateAsync(req.body);
      next();
    } catch (err) {
      logger.error("ValidationError", err);
      if (err.isJoi) return inValidParam(err.message, res);
      next(failureResponse(err.message, res));
    }
  };
};

export default validate;
