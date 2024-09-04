CREATE TABLE IF NOT EXISTS "invest-platform_newsletter" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "invest-platform_newsletter_email_unique" UNIQUE("email")
);
