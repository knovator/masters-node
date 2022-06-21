import mongoose from "mongoose";
import defaults from "helpers/defaults";

const path = require("path");
const dotenv = require("dotenv");
const data = path.dirname(require.main?.filename);
dotenv.config({ path: path.join(data, ".env") });
const dbConfigure =
  process.env.DB_USERNAME && process.env.DB_PASSWORD
    ? `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`
    : "";
const dConnection = `${process.env.DB_CONNECTION}://${dbConfigure}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// const options: mongoose.ConnectOptions = {
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useFindAndModify: false
// };
mongoose
  .connect(dConnection)
  .then(async () => {})
  .catch((err) => {
    defaults.logger.error("DB Error", err);
  });

export default mongoose;
