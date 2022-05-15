import { oakHandler } from "../types.ts";
import { getBlogMetaList, getBlogPost } from "../utilities/parser.utility.ts";

export const getBlogList: oakHandler<"/"> = async (ctx) => {
  const blogMetaList = await getBlogMetaList();

  console.log(blogMetaList);

  ctx.render("index.eta", { blogMetaList });
};

export const getBlogByName: oakHandler<"/blog/:name"> = async (ctx) => {
  const blogData = await getBlogPost(ctx.params.name);

  console.log(blogData);

  ctx.render("blogpost.eta", { blogData });
};
