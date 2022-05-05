import {
  oak,
  bold,
  brightGreen,
  Marked,
  envConfig,
  oakAdapter,
  viewEngine,
  dejsEngine,
} from '../deps.ts';
import staticMiddlware from './middleware/static.middleware.ts';

envConfig({ export: true });

const app = new oak.Application();
const router = new oak.Router();

app.use(
  viewEngine(oakAdapter, dejsEngine, {
    viewRoot: './views',
  })
);

router.get('/', (ctx) => {
  ctx.render('index.ejs', { name: 'DENO!' });
});

app.use(router.allowedMethods()).use(router.routes());

app.use(staticMiddlware('public'));

console.log(
  bold(brightGreen(`Server running on port ${Deno.env.get('PORT')}`))
);
await app.listen({ port: parseInt(<string>Deno.env.get('PORT')) });

// const decoder = new TextDecoder('utf-8');
// const markdown = decoder.decode(
//   await Deno.readFile('./markdown/4-9-22.markdown')
// );
// const markup = Marked.parse(markdown);
// console.log(markup.content);
// console.log(markup.meta);
