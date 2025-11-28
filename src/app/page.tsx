import { TokenTable } from "@/components/token-table/TokenTable";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050509] px-3 py-4 text-gray-100 md:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-indigo-500/80" />
            <span className="text-sm font-semibold tracking-tight">
              Axiom Pulse (Replica)
            </span>
          </div>
          <div className="flex gap-2 text-xs text-gray-400">
            <span className="rounded-full bg-white/5 px-3 py-1">
              Pulse
            </span>
            <span className="cursor-default rounded-full px-3 py-1 hover:bg-white/5">
              Discover
            </span>
            <span className="cursor-default rounded-full px-3 py-1 hover:bg-white/5">
              Trackers
            </span>
          </div>
        </header>

        <TokenTable />
      </div>
    </main>
  );
}
