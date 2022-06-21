import {
  oak,
  bold,
  brightGreen,
  envConfig,
  oakAdapter,
  viewEngine,
  etaEngine,
} from './deps.ts';
import staticMiddlware from './middlewares/static.middleware.ts';
import blogRouter from './routes/blog.router.ts';

export interface MyState {
  id: number;
}

envConfig({ export: true });

const app = new oak.Application<MyState>();

app.use(
  viewEngine(oakAdapter, etaEngine, {
    viewRoot: './views',
  })
);

app.use(async (ctx, next) => {
  ctx.state.id = 6;
  await next();
});

app.use(blogRouter.allowedMethods()).use(blogRouter.routes());

app.use(staticMiddlware('public'));

app.addEventListener('listen', ({ port }) => {
  console.log(bold(brightGreen(`Server running on port: ${port}`)));
});
await app.listen({ port: parseInt(<string>Deno.env.get('PORT')) });
