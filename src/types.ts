import { oak } from "./deps.ts";

export type oakHandlerType = (
  ctx: oak.RouterContext<
    "/",
    Record<string | number, string | undefined>,
    Record<string, any>
  >,
  next: () => Promise<unknown>
) => Promise<void>;
