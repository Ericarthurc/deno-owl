// deno-lint-ignore-file no-explicit-any
import { oak } from './deps.ts';

export type oakHandlerType = (
  ctx: oak.RouterContext<
    '/:id',
    {
      id: string;
    } & Record<string | number, string | undefined>,
    Record<string, any>
  >
) => void;
