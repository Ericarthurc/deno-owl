import { oak } from "../deps.ts";
import { getBlogByName, getBlogList } from "../handlers/blog.handler.ts";

const blogRouter = new oak.Router({ prefix: "/blog" });

blogRouter.get("/", getBlogList).get("/:name", getBlogByName);

export default blogRouter;
