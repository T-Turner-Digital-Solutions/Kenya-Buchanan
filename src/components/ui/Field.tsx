import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/format";

const controlClasses =
  "w-full border-b border-ink/20 bg-transparent px-0 py-3 font-sans text-sm text-ink transition-colors duration-300 placeholder:text-ink/30 focus:border-champagne-deep focus:outline-none";

function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <span className="flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="eyebrow">
        {children}
      </label>
      {hint ? <span className="text-[0.6rem] text-ink/40">{hint}</span> : null}
    </span>
  );
}

export function TextField({
  id,
  label,
  hint,
  className,
  ...rest
}: { id: string; label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cx("flex flex-col gap-1", className)}>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <input id={id} name={id} className={controlClasses} {...rest} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  hint,
  className,
  children,
  ...rest
}: { id: string; label: string; hint?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cx("flex flex-col gap-1", className)}>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <select id={id} name={id} className={cx(controlClasses, "appearance-none")} {...rest}>
        {children}
      </select>
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  hint,
  className,
  ...rest
}: { id: string; label: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={cx("flex flex-col gap-1", className)}>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <textarea id={id} name={id} rows={4} className={cx(controlClasses, "resize-none")} {...rest} />
    </div>
  );
}
