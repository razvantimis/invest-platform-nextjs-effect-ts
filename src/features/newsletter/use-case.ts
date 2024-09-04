import { Effect } from "effect";

import { NewsletterRepository } from "@/features/newsletter/repository";

export const subscribeEmailUseCase = (email: string) =>
  Effect.gen(function* () {
    yield* Effect.logDebug(`[subscribeEmailUseCase] New user subscribe: ${email}`)
    const repository = yield* NewsletterRepository;
    yield* repository.insertEmail(email);
    return true;
  });
