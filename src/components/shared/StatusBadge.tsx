import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label: string;
  variant: "new" | "final" | "migrated";
}

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border border-white/10",
        variant === "new" && "bg-emerald-500/10 text-emerald-300",
        variant === "final" && "bg-amber-500/10 text-amber-300",
        variant === "migrated" && "bg-sky-500/10 text-sky-300"
      )}
    >
      {label}
    </span>
  );
}
