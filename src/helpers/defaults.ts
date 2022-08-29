import { RESPONSE_CODE, internalServerError } from "../constants/common";

export default {
  logger: console,
  catchAsync: function (fn: any) {
    return function (req: any, res: any, next: any) {
      Promise.resolve(fn(req, res, next)).catch((err) => {
        // this.logger.error(err.message);
        res.status(internalServerError).json({
          code: RESPONSE_CODE.ERROR,
          message: err.message,
          data: {},
        });
      });
    };
  },
  authentication: (_req: any, _res: any, next: () => any) => {
    return next();
  },
  preDelete: (_record: any) => Promise.resolve({}),
  postUpdate: (_record: any) => Promise.resolve({}),
};
