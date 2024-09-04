import { ComingSoon } from "@/app/(coming-soon)/coming-soon";
import { appConfig } from "@/app-config";

export default async function Home() {
  if (appConfig.mode === "comingSoon") {
    return <ComingSoon />;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      empty
    </main>
  );
}
