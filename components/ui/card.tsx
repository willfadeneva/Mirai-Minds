import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-sky-100 bg-white/85 p-6 text-slate-800 shadow-[0_18px_45px_rgba(14,165,233,0.12)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
