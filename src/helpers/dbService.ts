import { FilterQuery, Model, PopulateOptions, QueryOptions, UpdateQuery } from "mongoose";

export async function bulkUpdate<T extends EntityType>(
  Modal: Model<T>,
  filter: FilterQuery<T>,
  data: UpdateQuery<T>
) {
  try {
    return await Modal.updateMany(filter, data);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function findOneAndUpdateDocument<T extends EntityType>(
  Modal: Model<T>,
  filter: FilterQuery<T>,
  data: UpdateQuery<T>,
  options = { new: true },
  populate: PopulateOptions
) {
  try {
    let response = await Modal.findOneAndUpdate(filter, data, options).populate(
      populate || {}
    );
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createDocument<T extends EntityType>(
  Modal: Model<T>,
  data: UpdateQuery<T>
) {
  try {
    let response = await Modal.create(data);
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getDocumentByQuery<T extends EntityType>(
  Modal: Model<T>,
  where: FilterQuery<T>,
  select: any[] = []
) {
  try {
    let response = await Modal.findOne(where, select);
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function countDocument<T extends EntityType>(
  Modal: Model<T>,
  where: FilterQuery<T>
) {
  try {
    let count = await Modal.where(where).countDocuments();
    return count;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getAllDocuments<T extends EntityType>(
  Modal: Model<T>,
  where: FilterQuery<T>,
  options: QueryOptions
) {
  try {
    // @ts-ignore
    let documents = Modal.paginate(where, options);
    return documents;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
