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


// types

/**
 * Temporary little type hack to cast a trpc action
 * when passing the action to `useActionState`
 * @example useActionState(createBoard as MakeAction<typeof createBoard>)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MakeAction<T> = T extends (...args: any[]) => Promise<infer U>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ? (state: any, fd: FormData) => Promise<U>
  : never
