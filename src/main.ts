import {
  oak,
  bold,
  brightGreen,
  envConfig,
  oakAdapter,
  viewEngine,
  dejsEngine,
} from "../deps.ts";
import staticMiddlware from "./middlewares/static.middleware.ts";
import { getBlogMetaArray, getBlogPost } from "./utilities/parser.utility.ts";

envConfig({ export: true });

const app = new oak.Application();
const router = new oak.Router();

app.use(
  viewEngine(oakAdapter, dejsEngine, {
    viewRoot: "./views",
  })
);

// TESTING
router.get("/", async (ctx) => {
  const blogObj = await getBlogPost("4-19-22");
  ctx.render("index.ejs", blogObj);
});

app.use(router.allowedMethods()).use(router.routes());

app.use(staticMiddlware("public"));

console.log(
  bold(brightGreen(`Server running on port ${Deno.env.get("PORT")}`))
);
await app.listen({ port: parseInt(<string>Deno.env.get("PORT")) });
