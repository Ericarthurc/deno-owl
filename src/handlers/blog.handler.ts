import { oakHandler } from "../types.ts";
import { getBlogMetaList, getBlogPost } from "../utilities/parser.utility.ts";

export const getBlogList: oakHandler<"/"> = async (ctx) => {
  const metaList = await getBlogMetaList();
  ctx.response.body = metaList;
};

export const getBlogByName: oakHandler<"/:name"> = async (ctx) => {
  const blogData = await getBlogPost(ctx.params.name);
  ctx.response.body = blogData;
};
