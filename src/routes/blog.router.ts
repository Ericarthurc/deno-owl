import { oak } from "../deps.ts";
import { getBlogById, getBlogList } from "../handlers/blog.handler.ts";

const blogRouter = new oak.Router({ prefix: "/blog" });

blogRouter.get("/", getBlogList).get("/:id", getBlogById);

export default blogRouter;
