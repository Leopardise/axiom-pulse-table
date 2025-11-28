"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateTokenPrice } from "@/store/tokensSlice";
import { createMockPriceFeed } from "@/lib/mockPriceFeed";

export function usePriceFeed(enabled: boolean) {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((s) =>
    s.tokens.allIds.map((id) => s.tokens.byId[id])
  );

  useEffect(() => {
    if (!enabled || tokens.length === 0) return;

    const feed = createMockPriceFeed(tokens, (updates) => {
      for (const u of updates) {
        dispatch(
          updateTokenPrice({
            id: u.id,
            price: u.price,
            priceChange5m: u.priceChange5m,
          })
        );
      }
    });

    return () => {
      feed.close();
    };
  }, [enabled, tokens, dispatch]);
}
