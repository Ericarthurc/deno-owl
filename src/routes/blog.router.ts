import { oak } from "../deps.ts";
import { getBlogByName, getBlogList } from "../handlers/blog.handler.ts";
import { MyState } from "../main.ts";

const blogRouter = new oak.Router<MyState>();

blogRouter
  .get("/", getBlogList)
  .get("/blog", (ctx) => {
    ctx.response.redirect("/");
  })
  .get("/blog/:name", getBlogByName);

export default blogRouter;
