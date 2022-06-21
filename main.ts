import "dotenv/config";
import express from "express";
import { RESPONSE_CODE, internalServerError } from "constants/common";

global.logger = console;
global.catchAsync = (fn) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error(err.message);
    res.status(internalServerError).json({
      code: RESPONSE_CODE.ERROR,
      message: err.message,
      data: {},
    });
  });
};
global.authentication = (_req: any, _res: any, next: () => any) => {
  return next();
};
global.convertToTz = async (params: any) => {
  let convertedDate = params?.date;
  return convertedDate || params;
};
global.routePrefix = "/admin/masters";
import masters from "masters";

const app = express();
const http = require("http");
const server = http.createServer(app);

app.use(express.json());
app.use(masters);

server.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT} ✅`);
});
