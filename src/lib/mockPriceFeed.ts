import type { Token } from "@/types/token";

export type PriceUpdateHandler = (updates: Array<Pick<Token, "id" | "price" | "priceChange5m">>) => void;

export interface MockPriceFeed {
  close: () => void;
}

export function createMockPriceFeed(
  initial: Token[],
  onUpdate: PriceUpdateHandler
): MockPriceFeed {
  let closed = false;

  const intervalId = setInterval(() => {
    if (closed) return;

    const updates = initial.map((t) => {
      const drift = (Math.random() - 0.5) * 0.015;
      const newPrice = Math.max(t.price * (1 + drift), 0.0000001);
      const newChange = t.priceChange5m + drift * 100;

      return {
        id: t.id,
        price: Number(newPrice.toFixed(8)),
        priceChange5m: Number(newChange.toFixed(2)),
      };
    });

    onUpdate(updates);
  }, 1500);

  return {
    close: () => {
      closed = true;
      clearInterval(intervalId);
    },
  };
}
