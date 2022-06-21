declare module "masters-node" {
  interface MastersProps {
    convertToTz: (params: any) => any;
    authentication(_req: any, _res: any, next: () => any): void;
    logger: any;

    catchAsync(fn: any): (req: any, res: any, next: any) => void;
  }
}
