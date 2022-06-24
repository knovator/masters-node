export const bulkUpdate = (model: any, filter: any, data: any) =>
  new Promise((resolve, reject) => {
    model.updateMany(filter, data, (err: any, result: any) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

export const findOneAndUpdateDocument = (
  model: any,
  filter: any,
  data: any,
  options = { new: true },
  populate = {}
) =>
  new Promise((resolve, reject) => {
    model
      .findOneAndUpdate(filter, data, options, (err: any, result: any) => {
        if (err) reject(err);
        else resolve(result);
      })
      .populate(populate);
  });

export const createDocument = (model: any, data: any) =>
  new Promise((resolve, reject) => {
    model.create(data, (err: any, result: any) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

export const getDocumentByQuery = (model: any, where: any, select = []) =>
  new Promise((resolve, reject) => {
    model.findOne(where, select, (err: any, data: any) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

export const countDocument = (model: any, where: any) =>
  new Promise((resolve, reject) => {
    model.where(where).countDocuments((err: any, result: any) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

export const getAllDocuments = (model: any, query: any, options: any) =>
  new Promise((resolve, reject) => {
    model.paginate(query, options, (err: any, data: any) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
