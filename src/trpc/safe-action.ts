import { initTRPC, TRPCError } from '@trpc/server';
import { experimental_nextAppDirCaller } from '@trpc/server/adapters/next-app-dir';
 
interface Meta {
  span: string;
}
 
export const t = initTRPC.meta<Meta>().create();
 
const serverActionProcedure = t.procedure.experimental_caller(
  experimental_nextAppDirCaller({
    pathExtractor: ({ meta }) => (meta as Meta).span,
  }),
);

export const unauthenticatedAction = serverActionProcedure;

export const authenticatedAction = serverActionProcedure.use(() => {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
 
  // return opts.next({
  //   ctx: {
  //     ...opts.ctx,
  //     user: opts.ctx.user, // <-- ensures type is non-nullable
       
  //   },
  // });
});