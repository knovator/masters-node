import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
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
const namesSchema = defaults.languages.reduce((acc: any, lang) => {
  acc[lang.code] = { type: String, required: true };
  return acc;
}, {});

export const MasterSchema = new Schema<MasterType>(
  {
    name: { type: String }, // name of
    // @ts-ignore
    names: namesSchema,
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
    canEdit: { type: Boolean, default: true },
    deletedAt: { type: Date },
    extra: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    deletedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

MasterSchema.pre('save', async function (next) {
  if ((this as any).parentId) {
    const masterData: any = await Master.findOne({
      parentId: (this as any).parentId,
      deletedAt: { $exists: false },
    }).sort({ createdAt: -1 });
    let number = masterData && masterData.seq ? masterData.seq + 1 : 1;

    if (!(this as any).seq) {
      (this as any).seq = number;
    }
  }
  next();
});
MasterSchema.pre('findOne', function (next) {
  this.getQuery().deletedAt = { $exists: false };
  next();
});
MasterSchema.pre('find', function (next) {
  this.getQuery().deletedAt = { $exists: false };
  next();
});
MasterSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    if (typeof defaults.preDelete === 'function') {
      await defaults.preDelete(this);
    }
    next();
  }
);
MasterSchema.post('findOneAndUpdate', async function (doc, next) {
  if (typeof defaults.postUpdate === 'function') {
    await defaults.postUpdate(doc);
  }
  next();
});
MasterSchema.method('toJSON', function () {
  var obj: any = this.toObject();
  delete obj['__v'];

  return obj;
});

MasterSchema.plugin(uniqueValidator);
MasterSchema.plugin(mongoosePaginate);

const Master = model('master', MasterSchema, 'master');

export default Master;
