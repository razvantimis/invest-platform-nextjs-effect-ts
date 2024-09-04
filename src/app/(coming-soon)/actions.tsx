"use server";

import { Effect, Layer } from "effect";
import { z } from "zod";

import { AppConfigLive } from "@/app-config";
import { NewsletterRepositoryLive } from "@/db/newsletter-repository";
import { subscribeEmailUseCase } from "@/features/newsletter/use-case";
import { rateLimitByIp } from "@/lib/limiter";
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

    const runSubscribeEmailUseCase = Effect.provide(
      subscribeEmailUseCase(email),
      Layer.merge(NewsletterRepositoryLive, AppConfigLive),
    );
    await Effect.runPromise(runSubscribeEmailUseCase);
  });
