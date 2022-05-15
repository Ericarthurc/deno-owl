import { oakHandler } from "../types.ts";
import { getBlogMetaList, getBlogPost } from "../utilities/parser.utility.ts";

export const getBlogList: oakHandler<"/"> = async (ctx) => {
  const blogMetaList = await getBlogMetaList();
  ctx.render("index.ejs", { blogMetaList });
};

export const getBlogByName: oakHandler<"/blog/:name"> = async (ctx) => {
  const blogData = await getBlogPost(ctx.params.name);
  ctx.render("blogpost.ejs", { blogData });
};
