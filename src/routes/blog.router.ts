import { oak } from '../deps.ts';
import { getBlogById } from '../handlers/blog.handler.ts';

const blogRouter = new oak.Router({ prefix: '/blog' });

blogRouter
  .get('/', (ctx) => {
    ctx.response.body = 'hi';
  })
  .get('/:id', getBlogById);

export default blogRouter;
