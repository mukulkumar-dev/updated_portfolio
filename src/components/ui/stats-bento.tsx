import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-6 gap-4", className)} {...props} />
);

type BentoSpan = "primary" | "wide" | "medium" | "small";

const spanClasses: Record<BentoSpan, string> = {
  primary: "md:col-span-3 md:row-span-2",
  wide: "md:col-span-3",
  medium: "md:col-span-2",
  small: "md:col-span-1",
};

interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  span?: BentoSpan;
  children: ReactNode;
}

export const BentoCard = ({ span = "small", className, children, ...props }: BentoCardProps) => (
  <div
    className={cn(
      "card-elevated tilt-card rounded-3xl p-6 sm:p-8 border border-border relative overflow-hidden flex flex-col justify-between",
      spanClasses[span],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default BentoGrid;
