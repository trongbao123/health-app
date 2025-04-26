"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Fit = "cover" | "contain" | "fill" | "none" | "scale-down";
type Ratio =
  | "square"
  | "video"
  | "portrait"
  | "wide"
  | "auto"
  | `${number}/${number}`;

interface SmartImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  aspectRatio?: Ratio;
  objectFit?: Fit;
}

export default function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  containerClassName = "",
  aspectRatio = "square",
  objectFit = "cover",
}: SmartImageProps) {
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const ratioClasses: Record<Ratio, string> = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[5/3]",
    auto: "",
    "1/1": "aspect-[1/1]",
    "16/9": "aspect-[16/9]",
    "3/4": "aspect-[3/4]",
    "5/3": "aspect-[5/3]",
  };

  const fitClasses: Record<Fit, string> = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  };

  const aspectClass =
    ratioClasses[aspectRatio as Ratio] ?? `aspect-[${aspectRatio}]`;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        aspectClass,
        containerClassName
      )}
    >
      {hydrated && loading && (
        <Skeleton className="absolute inset-0 h-full w-full bg-gray-200" />
      )}

      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "w-full h-full",
          fitClasses[objectFit],
          hydrated &&
            `transition-opacity duration-300 ${
              loading ? "opacity-0" : "opacity-100"
            }`,
          className
        )}
        onLoad={() => setLoading(false)}
        priority={!hydrated}
        data-no-image-search="true"
      />
    </div>
  );
}
