import { Effect } from "effect";

import { EmailService } from "@/features/common/email.service";
import { NewsletterRepository } from "@/features/newsletter/newsletter.repository";

export const subscribeEmailUseCase = (email: string) =>
  Effect.gen(function* () {
    yield* Effect.logDebug(
      `[subscribeEmailUseCase] New user subscribe: ${email}`,
    );
    const repository = yield* NewsletterRepository;
    yield* repository.insertEmail(email);

    const service = yield* EmailService;
    yield* service.subscribeEmail(email);
    return true;
  });
