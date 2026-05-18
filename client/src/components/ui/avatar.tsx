import * as React from "react";
import { cn } from "../../utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback: string;
  isOnline?: boolean;
  size?: "sm" | "md" | "lg";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, fallback, isOnline = false, size = "md", ...props }, ref) => {
    // sm = 36px, md = 40px, lg = 44px
    const sizeClasses = {
      sm: "h-9 w-9 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-11 w-11 text-base",
    };

    const dotSizeClasses = {
      sm: "h-2.5 w-2.5 right-0 bottom-0",
      md: "h-3 w-3 right-0.5 bottom-0.5",
      lg: "h-3 w-3 right-0.5 bottom-0.5",
    };

    // Calculate background colors based on fallback text so they vary but remain harmonized
    const getBgColor = (text: string) => {
      const charCodeSum = text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const gradients = [
        "from-[#28241E] to-[#3D3528] text-accent",
        "from-[#1C1814] to-[#28241E] text-accent",
        "from-[#2E2018] to-[#3D3528] text-accent",
      ];
      return gradients[charCodeSum % gradients.length];
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-shrink-0 items-center justify-center rounded-full select-none font-medium",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={fallback}
            className="h-full w-full rounded-full object-cover border border-border/40"
            onError={(e) => {
              // If image fails, clear it and trigger fallback display
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br border border-border/40 uppercase font-medium tracking-wide",
              getBgColor(fallback)
            )}
          >
            {fallback.slice(0, 2)}
          </div>
        )}

        {isOnline && (
          <span
            className={cn(
              "absolute rounded-full bg-online ring-2 ring-background block",
              dotSizeClasses[size]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
