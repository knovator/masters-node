declare global {
  function logger(everything: any): void;
  function catchAsync(fn: any): void;
}

export {};
