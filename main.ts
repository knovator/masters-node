import express from "express";
import masters from "masters";
import("dotenv/config");

const app = express();
const http = require("http");
const server = http.createServer(app);

global.logger = (everything: any) => console.log(everything);
global.catchAsync = (fn) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log("Catch Async Error", err);
    // logger.error(err.message);
    // res.status(responseCode.internalServerError).json({
    //   code: RESPONSE_CODE.ERROR,
    //   message: err.message,
    //   data: {},
    // });
  });
};

app.use(masters);

server.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT} ✅`);
});
