import * as React from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          // Variants
          {
            "bg-accent text-background hover:bg-accent-hover font-semibold":
              variant === "primary",
            "border border-border bg-transparent text-text-primary hover:bg-elevated hover:border-text-secondary/30":
              variant === "secondary",
            "bg-transparent text-text-secondary hover:bg-elevated hover:text-text-primary":
              variant === "ghost",
            "bg-error text-text-primary hover:bg-error/90":
              variant === "danger",
          },
          // Sizes
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 py-2": size === "md",
            "h-12 px-6 text-base": size === "lg",
            "h-10 w-10 p-0 flex-shrink-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
