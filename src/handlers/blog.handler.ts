import { oakHandlerType } from '../types.ts';

// export const getBlogPosts = async (ctx, next) => {};

export const getBlogById: oakHandlerType = (ctx) => {
  console.log(ctx.params.id);
  ctx.response.headers.set('Content-Type', 'text/html');
  ctx.response.body = `<h1>${ctx.params.id}</h1>`;
};

// export const getBlogById = ({
//   params,
//   request,
//   response,
// }: {
//   params: { id: string };
//   request: any;
//   response: any;
// }) => {
//   console.log(params.id);
//   response.headers.set('Content-Type', 'text/html');
//   response.body = `<h1>${params.id}</h1>`;
// };
