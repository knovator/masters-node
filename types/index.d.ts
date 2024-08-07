declare module 'express-list-endpoints-descriptor' {
  function listEndpoints(routes: any): any;
}
declare module '@knovator/masters-node' {
  export type MastersProps = {
    authentication(_req: any, _res: any, next: () => any): void;
    logger: any;
    preDelete: (_record: any) => Promise<{}>;
    postUpdate: (_record: any) => Promise<{}>;
    catchAsync(fn: any): (req: any, res: any, next: any) => void;
  };

  function masters(props: MastersProps): import('express').Router;

  var Master: import('mongoose').Model<MasterType>;
}

type MasterType = {
  name: string;
  code: string;
  desc: string;
  parentId: import('mongoose').ObjectId;
  parentCode: string;
  img: import('mongoose').ObjectId;
  isDefault: boolean;
  isActive: boolean;
  seq: number;
  webDsply: string;
  isWebVisible: boolean; // it is a visible for web
  canDel: boolean;
  canEdit: boolean;
  deletedAt: Date;
  extra: string;
  createdBy: import('mongoose').ObjectId;
  updatedBy: [import('mongoose').ObjectId];
  deletedBy: import('mongoose').ObjectId;
};

type EntityType = MasterType;

type UpdateSequenceData = { id: string; seq: number };

type LanguageType = { code: string; name: string };
