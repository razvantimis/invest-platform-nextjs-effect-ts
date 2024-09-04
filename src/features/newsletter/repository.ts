import { Context, type Effect} from "effect";
import { type UnknownException } from "effect/Cause";

export interface INewsletterRepository {
  /**
   * this inserts an email record
   *
   * @param email the email to save
   */
  insertEmail: (email: string) => Effect.Effect<void, UnknownException, never>;
}
export class NewsletterRepository extends Context.Tag("NewsletterRepository")<
  NewsletterRepository,
  INewsletterRepository
>() {}

