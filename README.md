# Axiom Pulse – Token Discovery Table (Replica)

This project is a pixel-inspired replica of the **Axiom Trade Pulse** token discovery table.  
It focuses on **smooth performance**, **reusable architecture**, and **rich interactions** for token discovery.

## Live Links

- **Production (Vercel)**: TODO – add deployed URL  
- **GitHub Repository**: TODO – add repo URL  
- **Demo Video (YouTube)**: TODO – add unlisted YouTube link  

---

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript (strict)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching / Caching**: React Query
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) (Radix-based)
  - `Dialog`, `Tooltip`, `Popover`, `Skeleton`, `ScrollArea`, `Button`
- **Icons**: `lucide-react`

---

## High-Level Features

### 1. Token Discovery Table

- Three lanes:
  - **New Pairs**
  - **Final Stretch**
  - **Migrated**
- Each lane shows:
  - Token name + symbol
  - Price (tabular-nums)
  - 5m price change (color-coded with smooth transitions)
  - Age (minutes / hours)
  - **Quick Buy** pill opening a detailed modal

### 2. Interaction Patterns

- **Hover**: subtle row highlight, info icon fades in
- **Tooltip**: hover over info icon for quick explanation
- **Popover**: click info icon to see age / market cap / liquidity snapshot
- **Modal (Dialog)**:
  - Click row or Quick Buy to open a detail view
  - Close via X button, overlay click, or ESC
- **Sorting**:
  - Click headers “Price / 5m / Age” to sort ascending/descending
  - Sort state is per-column component

### 3. Real-Time Price Updates (WebSocket Mock)

- `createMockPriceFeed` simulates a WebSocket stream:
  - Every 1.5 seconds it pushes updated prices and 5m changes.
  - Redux store is updated via `updateTokenPrice`.
- 5m change cells use CSS transitions for **smooth color changes** when values update.

### 4. Loading, Error & Resilience

- **Loading**:
  - Initial token fetch is artificially delayed.
  - During this, each column shows multiple **skeleton rows** with shimmer-style placeholders.
- **Error**:
  - Columns can render a red error card if React Query reports `isError`.
  - A global `app/error.tsx` error boundary shows a fallback UI for unexpected errors.

---

## Architecture & Code Organization

```txt
src/
  app/
    layout.tsx          # Shell + Providers
    page.tsx            # Pulse layout + TokenTable
    error.tsx           # Global error boundary
    providers.tsx       # Redux + React Query providers
  components/
    token-table/
      TokenTable.tsx        # Top-level container, 3 columns
      TokenColumn.tsx       # Single lane (New/Final/Migrated)
      TokenRow.tsx          # Row with tooltip, popover, modal, quick buy
      TokenSkeletonRow.tsx  # Loading skeleton row
    shared/
      StatusBadge.tsx       # Reusable pill badge
  hooks/
    useTokens.ts        # React Query + Redux sync
    usePriceFeed.ts     # Mock WebSocket price streaming
  lib/
    queryClient.ts      # React Query client
    mockPriceFeed.ts    # WebSocket-like price feed mock
    formatters.ts       # Price / number / age formatting
  store/
    index.ts            # Redux store + typed hooks
    tokensSlice.ts      # Tokens state + reducers
  types/
    token.ts            # Token & TokenStatus types
