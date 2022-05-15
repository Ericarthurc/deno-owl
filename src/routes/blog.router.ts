import { oak } from "../deps.ts";
import { getBlogByName, getBlogList } from "../handlers/blog.handler.ts";

const blogRouter = new oak.Router();

blogRouter
  .get("/", getBlogList)
  .get("/blog", (ctx) => {
    ctx.response.redirect("/");
  })
  .get("/blog/:name", getBlogByName);

export default blogRouter;
