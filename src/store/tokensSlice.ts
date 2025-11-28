import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Token } from "@/types/token";

export interface TokensState {
  byId: Record<string, Token>;
  allIds: string[];
}

const initialState: TokensState = {
  byId: {},
  allIds: [],
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<Token[]>) {
      state.byId = {};
      state.allIds = [];
      for (const token of action.payload) {
        state.byId[token.id] = token;
        state.allIds.push(token.id);
      }
    },
    updateTokenPrice(
      state,
      action: PayloadAction<{ id: string; price: number; priceChange5m: number }>
    ) {
      const token = state.byId[action.payload.id];
      if (!token) return;
      token.price = action.payload.price;
      token.priceChange5m = action.payload.priceChange5m;
    },
  },
});

export const { setTokens, updateTokenPrice } = tokensSlice.actions;
export default tokensSlice.reducer;
