import { oakHandler } from "../types.ts";

export const getBlogList: oakHandler<"/"> = async (ctx) => {
  ctx.response.body = "index";
};

export const getBlogById: oakHandler<"/:id"> = async (ctx) => {
  ctx.response.body = ctx.params.id;
};
