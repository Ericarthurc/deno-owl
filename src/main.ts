import { oak, envConfig, oakAdapter, viewEngine, dejsEngine } from './deps.ts';
import staticMiddlware from './middlewares/static.middleware.ts';
import blogRouter from './routes/blog.router.ts';

envConfig({ export: true });

const app = new oak.Application();

app.use(
  viewEngine(oakAdapter, dejsEngine, {
    viewRoot: './views',
  })
);

app.use(blogRouter.allowedMethods()).use(blogRouter.routes());

app.use(staticMiddlware('public'));

app.addEventListener('listen', ({ port }) => {
  console.log(`Server running on port: ${port}`);
});
await app.listen({ port: parseInt(<string>Deno.env.get('PORT')) });
