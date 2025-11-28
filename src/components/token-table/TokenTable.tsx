"use client";

import { useTokens } from "@/hooks/useTokens";
import { usePriceFeed } from "@/hooks/usePriceFeed";
import { TokenColumn } from "./TokenColumn";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TokenTable() {
  const { tokensById, tokenIds, isLoading, isError } = useTokens();

  usePriceFeed(!isLoading && !isError && tokenIds.length > 0);

  const tokens = tokenIds.map((id) => tokensById[id]);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-100">
            Pulse • Token Discovery
          </h1>
          <p className="mt-1 max-w-xl text-xs text-gray-400">
            Track new pairs, tokens in their final stretch, and freshly migrated
            plays with real-time price updates and responsive interactions.
          </p>
        </div>
      </div>

      <ScrollArea className="w-full rounded-3xl border border-white/10 bg-[#050509] p-3">
        <div className="grid gap-3 lg:grid-cols-3">
          <TokenColumn
            title="New Pairs"
            statusFilter="new"
            tokens={tokens}
            isLoading={isLoading}
            isError={isError}
          />
          <TokenColumn
            title="Final Stretch"
            statusFilter="final-stretch"
            tokens={tokens}
            isLoading={isLoading}
            isError={isError}
          />
          <TokenColumn
            title="Migrated"
            statusFilter="migrated"
            tokens={tokens}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
