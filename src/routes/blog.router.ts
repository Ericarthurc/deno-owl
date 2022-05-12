import { oak } from "../deps.ts";

const blogRouter = new oak.Router({ prefix: "/blog" });

blogRouter.get("/", (ctx, next) => {});
// .get("/:id");

export default blogRouter;
