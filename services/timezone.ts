// const moment = require("moment-timezone");

export const convertToTz = async (params: any) => {
  try {
    // let tz = params?.tz ? params.tz : process.env.TZ;
    // let format = params?.format ? params.format : "";
    let convertedDate = params.date;
    // let convertedDate = moment(params.date).tz(tz).format(format);
    return convertedDate;
  } catch (error) {
    // logger.error("Error - convertToTz", error);
    throw new Error(error);
  }
};
