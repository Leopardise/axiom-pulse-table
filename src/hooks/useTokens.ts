"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Token } from "@/types/token";
import { useAppDispatch, useAppSelector } from "@/store";
import { setTokens } from "@/store/tokensSlice";

// Client-side mock data (no /api call, but still using React Query)
const MOCK_TOKENS: Token[] = [
  {
    id: "1",
    name: "SOL Puppy",
    symbol: "PUPPY",
    status: "new",
    price: 0.00054,
    priceChange5m: 12.3,
    marketCap: 180000,
    liquidity: 42000,
    ageMinutes: 7,
  },
  {
    id: "2",
    name: "Memetic",
    symbol: "MEME",
    status: "new",
    price: 0.0021,
    priceChange5m: -4.8,
    marketCap: 290000,
    liquidity: 56000,
    ageMinutes: 15,
  },
  {
    id: "3",
    name: "Final Boss",
    symbol: "BOSS",
    status: "final-stretch",
    price: 0.013,
    priceChange5m: 3.2,
    marketCap: 930000,
    liquidity: 210000,
    ageMinutes: 42,
  },
  {
    id: "4",
    name: "Raydium Rocket",
    symbol: "RAYK",
    status: "migrated",
    price: 0.38,
    priceChange5m: 0.5,
    marketCap: 5200000,
    liquidity: 900000,
    ageMinutes: 180,
  },
];

async function fetchTokens(): Promise<Token[]> {
  // simulate latency for skeletons
  await new Promise((res) => setTimeout(res, 700));
  return MOCK_TOKENS;
}

export function useTokens() {
  const dispatch = useAppDispatch();

  const query = useQuery<Token[], Error>({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setTokens(query.data));
    }
  }, [query.data, dispatch]);

  const tokensState = useAppSelector((s) => s.tokens);

  return {
    ...query,
    tokensById: tokensState.byId,
    tokenIds: tokensState.allIds,
  };
}
