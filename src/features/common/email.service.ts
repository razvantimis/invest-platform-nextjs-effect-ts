import { Context, type Effect} from "effect";
import { type UnknownException } from "effect/Cause";

export interface IEmailService {
  /**
   * call remote service 
   *
   * @param email the email
  */
  subscribeEmail: (email: string) => Effect.Effect<void, UnknownException, never>;
}
export class EmailService extends Context.Tag("EmailService")<
  EmailService,
  IEmailService
>() {}
