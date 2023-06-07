import { Schema, model } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";
import uniqueValidator from 'mongoose-unique-validator';
import defaults from '../helpers/defaults';

const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = {
  customLabels: myCustomLabels,
};

const schema = new Schema<MasterType>(
  {
    name: { type: String, required: true }, // name of
    code: { type: String, required: true }, // master code
    desc: { type: String }, // description
    parentId: { type: Schema.Types.ObjectId, ref: 'master' }, //parent id is belongs to master
    parentCode: { type: String }, // code of parent master
    img: { type: Schema.Types.ObjectId, ref: 'file' }, //img url
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    seq: { type: Number }, // sub master value sequence
    webDsply: { type: String }, // visible name for frontend
    isWebVisible: { type: Boolean }, // it is a visible for web
    canDel: { type: Boolean, default: true },
    deletedAt: { type: Date },
    extra: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    deletedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

schema.pre('save', async function (next) {
  if (this.parentId) {
    const masterData: any = await Master.findOne({
      parentId: this.parentId,
      deletedAt: { $exists: false },
    }).sort({ createdAt: -1 });
    let number = masterData && masterData.seq ? masterData.seq + 1 : 1;

    if (!this.seq) {
      this.seq = number;
    }
  }
  next();
});
schema.pre('findOne', function (next) {
  this.getQuery().deletedAt = { $exists: false };
  next();
});
schema.pre('find', function (next) {
  this.getQuery().deletedAt = { $exists: false };
  next();
});
schema.pre('deleteOne', async function (next) {
  if (typeof defaults.preDelete === 'function') {
    await defaults.preDelete(this);
  }
  next();
});
schema.post('findOneAndUpdate', async function (doc, next) {
  if (typeof defaults.postUpdate === 'function') {
    await defaults.postUpdate(doc);
  }
  next();
});
schema.method('toJSON', function () {
  var obj: any = this.toObject();
  delete obj['__v'];

  return obj;
});

schema.plugin(uniqueValidator);
schema.plugin(mongoosePaginate);

const Master = model("master", schema, "master");

export default Master;
