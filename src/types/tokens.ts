export type TokenStatus = "new" | "final-stretch" | "migrated";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  status: TokenStatus;
  price: number;
  priceChange5m: number;
  marketCap: number;
  liquidity: number;
  ageMinutes: number;
}
