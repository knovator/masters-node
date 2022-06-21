declare global {
  var logger: any;
  var routePrefix: string;
  function catchAsync(fn: any): void;
  function authentication(_req: any, _res: any, next: () => any): void;
  function convertToTz(data: any): any;
}

export {};
