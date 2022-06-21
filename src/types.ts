import { oak } from './deps.ts';
import { MyState } from './main.ts';

export type oakHandler<T extends string> = (
  ctx: oak.RouterContext<T, oak.RouteParams<T>, MyState>
) => Promise<void> | void;
