"use client";

import * as React from "react";
import type { Token } from "@/types/token";
import { TokenRow } from "./TokenRow";
import { TokenSkeletonRow } from "./TokenSkeletonRow";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

type SortKey = "price" | "priceChange5m" | "ageMinutes";

interface Props {
  title: string;
  statusFilter: Token["status"];
  tokens: Token[];
  isLoading: boolean;
  isError: boolean;
}

export function TokenColumn({
  title,
  statusFilter,
  tokens,
  isLoading,
  isError,
}: Props) {
  const [sortKey, setSortKey] = React.useState<SortKey>("ageMinutes");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");

  const filtered = tokens.filter((t) => t.status === statusFilter);

  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  if (isError) {
    return (
      <div className="flex flex-col rounded-2xl border border-red-500/40 bg-red-950/20 p-3 text-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-red-200">{title}</h2>
          <StatusBadge label="Error" variant="migrated" />
        </div>
        <p className="mt-2 text-xs text-red-100/80">
          Failed to load tokens. Please refresh.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0A0A12] p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-gray-100">{title}</h2>
        <StatusBadge
          label={
            statusFilter === "new"
              ? "New Pairs"
              : statusFilter === "final-stretch"
              ? "Final Stretch"
              : "Migrated"
          }
          variant={
            statusFilter === "new"
              ? "new"
              : statusFilter === "final-stretch"
              ? "final"
              : "migrated"
          }
        />
      </div>

      <div className="mb-1 grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3 text-[11px] uppercase tracking-wide text-gray-500">
        <span>Name</span>
        <button
          type="button"
          onClick={() => handleSort("price")}
          className="flex items-center justify-end gap-1"
        >
          Price
          <SortChevron active={sortKey === "price"} dir={sortDir} />
        </button>
        <button
          type="button"
          onClick={() => handleSort("priceChange5m")}
          className="flex items-center justify-end gap-1"
        >
          5m
          <SortChevron active={sortKey === "priceChange5m"} dir={sortDir} />
        </button>
        <button
          type="button"
          onClick={() => handleSort("ageMinutes")}
          className="flex items-center justify-end gap-1"
        >
          Age
          <SortChevron active={sortKey === "ageMinutes"} dir={sortDir} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="space-y-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <TokenSkeletonRow key={i} />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="px-3 py-4 text-xs text-gray-500">
            No tokens in this lane yet.
          </div>
        ) : (
          <div className="space-y-1">
            {sorted.map((token) => (
              <TokenRow key={token.id} token={token} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SortChevron({
  active,
  dir,
}: {
  active: boolean;
  dir: "asc" | "desc";
}) {
  return (
    <span
      className={cn(
        "inline-block text-[9px] transition-transform",
        !active && "opacity-40",
        active && dir === "asc" && "rotate-180"
      )}
    >
      ▲
    </span>
  );
}
