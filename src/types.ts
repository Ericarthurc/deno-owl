import { oak } from "./deps.ts";

export type oakHandler<T extends string> = (
  ctx: oak.RouterContext<T>
) => Promise<void> | void;
