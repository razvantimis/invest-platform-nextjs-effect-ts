"use server";

import { z } from "zod";
import { rateLimitByIp } from "@/lib/limiter";
import { unauthenticatedAction } from "@/trpc/safe-action";

export const subscribeEmailAction = unauthenticatedAction
  .input(
    z.object({
      email: z.string().email(),
    })
  )
  .mutation(async ({ input: { email } }) => {
    await rateLimitByIp({ key: "newsletter" });
    // await subscribeEmailUseCase(email);
  });
