"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#050509]">
      <div className="max-w-md rounded-xl border border-red-500/40 bg-red-950/20 px-6 py-4">
        <h2 className="text-lg font-semibold text-red-200">
          Something went wrong.
        </h2>
        <p className="mt-2 text-sm text-red-100/80">
          Please retry. If the problem persists, refresh the page.
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
