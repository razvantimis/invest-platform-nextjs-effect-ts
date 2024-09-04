import { Effect, Layer } from "effect";
import { Resend } from "resend";

import { env } from "@/env";
import {
  EmailService,
  type IEmailService,
} from "@/features/common/email.service";

const resend = new Resend(env.EMAIL_SERVER_PASSWORD);

const implementation: IEmailService = {
  subscribeEmail: (email) =>
    Effect.tryPromise(async () => {
      const { error } = await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: env.RESEND_AUDIENCE_ID,
      });
      if (error) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw error;
      }
    }),
};

export const ResendEmailServiceLive = Layer.succeed(
  EmailService,
  implementation,
);
