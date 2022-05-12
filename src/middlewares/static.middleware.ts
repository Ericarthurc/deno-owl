import { oak } from "../deps.ts";

// Allows the path to be set
// export default (staticFolder: string, rootPath: string) => {
//   return async (ctx: oak.Context, next: () => Promise<unknown>) => {
//     if (!ctx.request.url.pathname.startsWith(rootPath)) return await next();

//     const newPath = ctx.request.url.pathname.slice(rootPath.length);
//     if (!newPath.startsWith('/') && newPath.length) return await next();

//     try {
//       await oak.send(ctx, newPath, {
//         root: `${staticFolder}`,
//         index: 'index.html',
//       });
//     } catch {
//       await next();
//     }
//   };
// };

// Serves static files on '/'
export default (staticFolder: string) => {
  return async (ctx: oak.Context, next: () => Promise<unknown>) => {
    try {
      await ctx.send({
        root: `${staticFolder}`,
      });
    } catch {
      await next();
    }
  };
};
