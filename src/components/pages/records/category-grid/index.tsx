"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Category = {
  title: string;
  subtitle: string;
  imageSrc: string;
  href: string;
};

type CategoryGridProps = {
  categories: Category[];
};

const imageLoadCache: Record<number, boolean> = {};
let isFirstLoad = false;

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
}: CategoryGridProps) => {
  const [loading, setLoading] = useState(!isFirstLoad);
  const [loadedImages, setLoadedImages] =
    useState<Record<number, boolean>>(imageLoadCache);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    if (!isFirstLoad) {
      const timer = setTimeout(() => {
        setLoading(false);
        isFirstLoad = true;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const initialState: Record<number, boolean> = { ...imageLoadCache };
    categories.forEach((_, idx) => {
      if (initialState[idx] === undefined) {
        initialState[idx] = false;
      }
    });
    setLoadedImages(initialState);
  }, [categories, hydrated]);

  const handleImageReady = (index: number) => {
    if (!hydrated) return;
    imageLoadCache[index] = true;
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {hydrated && loading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden h-[288px] bg-gray-800 animate-pulse"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="h-7 w-36 bg-gray-700 mb-2"></div>
                <div className="h-6 w-28 bg-gray-700"></div>
              </div>
            </div>
          ))
        : categories.map((category, idx) => (
            <Link
              key={idx}
              href={category.href}
              className="relative overflow-hidden h-[288px] transition-transform hover:scale-[1.02] duration-300 bg-[#FFCC21] p-[24px]"
            >
              {hydrated && !loadedImages[idx] && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
              )}

              <Image
                src={category.imageSrc}
                alt={category.title}
                width={288}
                height={288}
                className={`w-full h-full object-cover brightness-50 grayscale ${
                  hydrated
                    ? `transition-opacity duration-300 ${
                        loadedImages[idx] ? "opacity-100" : "opacity-0"
                      }`
                    : "opacity-100"
                }`}
                onLoad={() => handleImageReady(idx)}
                data-no-image-search="true"
                priority={!hydrated}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-[25px] font-normal text-[#FFCC21] mb-2">
                  {category.title}
                </h3>
                <div className="bg-[#FF963C] px-4 py-1 text-sm">
                  {category.subtitle}
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default CategoryGrid;
