import express from "express";
import { masters } from "./masters";

const app = express();
const http = require("http");
const server = http.createServer(app);

app.use(
  "/admin/masters",
  masters({
    authentication: (_req, _res, next) => {
      next();
    },
  })
);

server.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT} ✅`);
});
