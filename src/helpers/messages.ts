import { IResponse } from "../../types/Response";
import {
  RESPONSE_CODE,
  validationError,
  success,
  create,
} from "../constants/common";

export const failureResponse = (data: any, res: IResponse) => {
  let i = 0;
  if (data?.name === "ValidationError") {
    Object.keys(data?.errors).forEach((key) => {
      if (i !== 1) {
        data.message = data.errors[key].message;
      }
      i++;
    });
  }
  res.message = data.message;
  return res.status(validationError).json({
    code: RESPONSE_CODE.ERROR,
    message: data.message ? data.message : data,
  });
};

export const successResponse = (data: any, res: IResponse) => {
  return res.status(success).json({
    code: RESPONSE_CODE.DEFAULT,
    message: res.message,
    data: data,
  });
};

export const createdDocumentResponse = (data: any, res: IResponse) => {
  return res.status(create).json({
    code: RESPONSE_CODE.DEFAULT,
    message: res.message,
    data: data,
  });
};

export const recordNotFound = (res: IResponse) => {
  return res.status(success).json({
    code: RESPONSE_CODE.DEFAULT,
    message: res.message,
    data: {},
  });
};

export const inValidParam = (message: string, res: IResponse) => {
  message = message.replace(/\"/g, '');
  res.message = message;
  return res.status(validationError).json({
    code: RESPONSE_CODE.ERROR,
    message: message,
    data: {},
  });
};
