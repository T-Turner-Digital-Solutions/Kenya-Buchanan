import type { ReactNode } from "react";
import { cx } from "@/lib/format";

export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "h2";
}) {
  return <Tag className={cx("eyebrow", className)}>{children}</Tag>;
}
