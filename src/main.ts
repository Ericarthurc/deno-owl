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

envConfig({ export: true });

const app = new oak.Application();
const router = new oak.Router();

app.use(
  viewEngine(oakAdapter, dejsEngine, {
    viewRoot: "./views",
  })
);

// app.use(async (ctx, next) => {
//   console.log(ctx.request.headers);
//   console.log(ctx.request.ip);
//   console.log(ctx.request.ips);
//   console.log(ctx.request.method);
//   console.log(ctx.request.url);
//   await next();
// });

router.get("/", (ctx) => {
  ctx.render("index.ejs", { name: "DENO!" });
});

app.use(router.allowedMethods()).use(router.routes());

app.use(staticMiddlware("public"));

console.log(
  bold(brightGreen(`Server running on port ${Deno.env.get("PORT")}`))
);
await app.listen({ port: parseInt(<string>Deno.env.get("PORT")) });
