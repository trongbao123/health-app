"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode, ElementType } from "react";

interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  children: ReactNode;
}

const PageWrapper = ({
  as: Component = "div",
  className,
  children,
  ...rest
}: PageWrapperProps) => {
  return (
    <Component
      className={cn("w-full max-w-[960px] mx-auto px-4", className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default PageWrapper;
