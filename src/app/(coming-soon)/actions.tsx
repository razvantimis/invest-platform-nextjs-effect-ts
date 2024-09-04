"use server";

import { z } from "zod";

import { rateLimitByIp } from "@/lib/limiter";
import { logger } from "@/lib/logger";
import { unauthenticatedAction } from "@/lib/safe-action";

export const subscribeEmailAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
    }),
  )
  .handler(async ({ input: { email } }) => {
    await rateLimitByIp({ key: "newsletter" });
    // await subscribeEmailUseCase(email);
    logger.info(email);
  });
