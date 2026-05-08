import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  return (
    <button
      className={cn(
        "rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-sky-200",
        variant === "primary"
          ? "bg-sky-500 text-white shadow-[0_12px_30px_rgba(14,165,233,0.25)] hover:bg-sky-600"
          : "border border-sky-100 bg-white/80 text-slate-700 hover:bg-sky-50",
        className
      )}
      {...props}
    />
  );
}
