import { headers } from "next/headers";

export function getIp(): string | null {
  const forwardedFor = headers().get("x-forwarded-for");
  const realIp = headers().get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")?.[0]?.trim() ?? null;
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;
}
