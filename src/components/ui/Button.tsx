import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/format";

type Variant = "ink" | "outline" | "champagne" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 text-center font-sans uppercase tracking-wide2 transition-all duration-500 ease-silk disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-bone hover:bg-ink-soft",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  champagne: "bg-champagne text-ink hover:bg-champagne-deep hover:text-bone",
  ghost: "text-ink/70 hover:text-ink",
  light: "border border-bone/40 text-bone hover:bg-bone hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.6rem]",
  md: "px-6 py-3 text-[0.65rem]",
  lg: "px-9 py-4 text-[0.7rem]",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonElementProps = StyleProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkElementProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export type ButtonProps = ButtonElementProps | LinkElementProps;

export function Button(props: ButtonProps) {
  const { variant = "ink", size = "md", className, children } = props;
  const classes = cx(base, variants[variant], sizes[size], className);

  // Style props are consumed here; everything else passes through to the element.
  const rest = { ...props } as Record<string, unknown>;
  delete rest.variant;
  delete rest.size;
  delete rest.className;
  delete rest.children;
  delete rest.href;

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
