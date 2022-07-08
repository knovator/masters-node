import defaults from './helpers/defaults';
import routes from './routes/masterRoutes';
import Master from './models/Master';

interface MastersProps {
  convertToTz: (params: any) => any;
  authentication(_req: any, _res: any, next: () => any): void;
  logger: any;

  catchAsync(fn: any): (req: any, res: any, next: any) => void;
}

export function masters({
  convertToTz,
  authentication,
  logger,
  catchAsync,
}: Partial<MastersProps> = defaults) {
  if (typeof catchAsync === 'function') defaults.catchAsync = catchAsync;
  if (typeof convertToTz === 'function') defaults.convertToTz = convertToTz;
  if (typeof authentication === 'function')
    defaults.authentication = authentication;
  if (typeof logger === 'function') defaults.logger = logger;
  return routes;
}

export { Master }