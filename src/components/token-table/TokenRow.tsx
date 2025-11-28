"use client";

import * as React from "react";
import type { Token } from "@/types/token";
import { formatAge, formatCompactNumber, formatPrice } from "@/lib/formatters";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  token: Token;
}

export const TokenRow = React.memo(function TokenRow({ token }: Props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openPopover, setOpenPopover] = React.useState(false);

  const priceUp = token.priceChange5m >= 0;

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={cn(
          "group grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3 py-2 text-sm",
          "cursor-pointer rounded-lg transition-colors hover:bg-white/4"
        )}
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate font-medium text-gray-100">
            {token.name}
          </span>
          <span className="truncate text-xs uppercase text-gray-400">
            {token.symbol}
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="hidden rounded-full border border-white/10 p-1 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 md:inline-flex"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPopover(true);
                }}
              >
                <Info className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="max-w-xs text-xs">
                Quick overview of age, market cap and liquidity.
              </p>
            </TooltipContent>
          </Tooltip>

          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <span className="sr-only">Token stats popover</span>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="start"
              className="w-64 border-white/10 bg-[#101018]"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-1 text-xs text-gray-300">
                {token.name} ({token.symbol})
              </p>
              <p className="text-xs text-gray-400">
                Age:{" "}
                <span className="text-gray-200">
                  {formatAge(token.ageMinutes)}
                </span>
              </p>
              <p className="mt-1 text-xs text-gray-400">
                MCap:{" "}
                <span className="text-gray-200">
                  ${formatCompactNumber(token.marketCap)}
                </span>
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Liquidity:{" "}
                <span className="text-gray-200">
                  ${formatCompactNumber(token.liquidity)}
                </span>
              </p>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center justify-end tabular-nums">
          <span className="rounded-md bg-black/40 px-2 py-0.5 text-xs text-gray-100">
            ${formatPrice(token.price)}
          </span>
        </div>

        <div className="flex items-center justify-end tabular-nums">
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-xs transition-colors duration-500",
              priceUp
                ? "bg-emerald-500/10 text-emerald-300"
                : "bg-rose-500/10 text-rose-300"
            )}
          >
            {priceUp ? "+" : ""}
            {token.priceChange5m.toFixed(2)}%
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 text-xs text-gray-400">
          <span>{formatAge(token.ageMinutes)}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-300 hover:bg-indigo-500/20"
          >
            <Zap className="h-3 w-3" />
            Quick Buy
          </button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-md border border-white/10 bg-[#090913]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {token.name}
                <span className="text-xs uppercase text-gray-400">
                  {token.symbol}
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-400">
                Token snapshot with price, change, liquidity and age.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 space-y-2 text-sm text-gray-200">
              <div className="flex justify-between">
                <span>Price</span>
                <span>${formatPrice(token.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>5m Change</span>
                <span
                  className={priceUp ? "text-emerald-300" : "text-rose-300"}
                >
                  {priceUp ? "+" : ""}
                  {token.priceChange5m.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Market Cap</span>
                <span>${formatCompactNumber(token.marketCap)}</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidity</span>
                <span>${formatCompactNumber(token.liquidity)}</span>
              </div>
              <div className="flex justify-between">
                <span>Age</span>
                <span>{formatAge(token.ageMinutes)}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
});
