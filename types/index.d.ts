declare module 'express-list-endpoints-descriptor' {
  function listEndpoints(routes: any): any;
}
declare module '@knovator/masters-node' {
  export type MastersProps = {
    convertToTz: (params: any) => any;
    authentication(_req: any, _res: any, next: () => any): void;
    logger: any;

    catchAsync(fn: any): (req: any, res: any, next: any) => void;
  };

  function masters(props: MastersProps): import('express').Router;

  var Master: import('mongoose').Model<MasterType>;
}

declare module 'Router' {
  descriptor: any;
  // import { Router } from 'express';
  // Router.descriptor: any = '';
  // export default Router;
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
  isApproved: boolean;
  deletedAt: Date;
  createdBy: import('mongoose').ObjectId;
  updatedBy: [import('mongoose').ObjectId];
  deletedBy: import('mongoose').ObjectId;
};

type EntityType = MasterType;

type UpdateSequenceData = { id: string; seq: number };
