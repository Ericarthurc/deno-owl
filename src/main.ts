import {
  oak,
  eta,
  bold,
  brightGreen,
  envConfig,
  oakAdapter,
  viewEngine,
  etaEngine,
} from "./deps.ts";
import staticMiddlware from "./middlewares/static.middleware.ts";
import blogRouter from "./routes/blog.router.ts";

envConfig({ export: true });

eta.configure({
  views: `${Deno.cwd()}/views/`,
});

const app = new oak.Application();

app.use(
  viewEngine(oakAdapter, etaEngine, {
    viewRoot: "./views",
  })
);

app.use(blogRouter.allowedMethods()).use(blogRouter.routes());

app.use(staticMiddlware("public"));

app.addEventListener("listen", ({ port }) => {
  console.log(bold(brightGreen(`Server running on port: ${port}`)));
});
await app.listen({ port: parseInt(<string>Deno.env.get("PORT")) });
