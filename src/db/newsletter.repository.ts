import { Effect, Layer } from "effect";

import { database } from "@/db";
import { newsletters } from "@/db/schema";
import {
  NewsletterRepository,
  type INewsletterRepository,
} from "@/features/newsletter/newsletter.repository";

const implementation: INewsletterRepository = {
  insertEmail: (email: string) =>
    Effect.tryPromise(async() => {
      await database
        .insert(newsletters)
        .values({
          email,
        })
        .onConflictDoNothing();
      // we need onConflictDoNothing because if the same person tries to subscribe twice, we shouldn't crash for them
    }),
};

export const NewsletterRepositoryLive = Layer.succeed(
  NewsletterRepository,
  implementation,
);
