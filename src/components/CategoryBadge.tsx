import { SUBJECTS } from "@/lib/data";
import type { Subject } from "@/lib/types";

interface CategoryBadgeProps {
  subject: Subject;
  size?: "sm" | "md";
}

export function CategoryBadge({ subject, size = "sm" }: CategoryBadgeProps) {
  const info = SUBJECTS[subject];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span className={`inline-block rounded-full font-semibold ${sizeClass} ${info.badge}`}>
      {info.label}
    </span>
  );
}
