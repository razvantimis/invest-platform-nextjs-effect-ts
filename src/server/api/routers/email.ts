
import { rateLimitByIp } from "@/lib/limiter";
import { logger } from "@/lib/logger";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const emailRouter = createTRPCRouter({
  subscribeEmail: publicProcedure.input(
    z.object({
      email: z.string().email(),
    })
  )
  .mutation(async ({ input: { email } }) => {
    await rateLimitByIp({ key: "newsletter" });
    logger.info(email)
    
  })
});