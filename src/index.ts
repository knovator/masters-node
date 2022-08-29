import defaults from './helpers/defaults';
import routes from './routes/masterRoutes';
import Master from './models/Master';

interface MastersProps {
  authentication(_req: any, _res: any, next: () => any): void;
  logger: any;
  catchAsync(fn: any): (req: any, res: any, next: any) => void;
  preDelete: (_record: any) => Promise<{}>;
  postUpdate: (_record: any) => Promise<{}>;
}

export function masters({
  authentication,
  logger,
  catchAsync,
  preDelete,
  postUpdate,
}: Partial<MastersProps> = defaults) {
  if (typeof catchAsync === 'function') defaults.catchAsync = catchAsync;
  if (typeof authentication === 'function')
    defaults.authentication = authentication;
  if (typeof logger === 'function') defaults.logger = logger;
  if (typeof preDelete === 'function') defaults.preDelete = preDelete;
  if (typeof postUpdate === 'function') defaults.postUpdate = postUpdate;
  return routes;
}

export { Master }