"use client";

import { useState } from "react";
import SmartImage from "@/components/common/smart-image";
import FetchMoreButton from "@/components/common/fetch-more-button";
import { HealthService } from "@/services/client/health/health.service";

interface HealthListProps {
  initialItems: any[];
  initialPagination: {
    page: number;
    hasMore: boolean;
    limit?: number;
    totalItems?: number;
    totalPages?: number;
  };
}

const HealthList: React.FC<HealthListProps> = ({
  initialItems,
  initialPagination,
}) => {
  const [items, setItems] = useState(initialItems ?? []);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleLoadMore = async () => {
    if (loading || !pagination.hasMore) return;

    setLoading(true);
    try {
      const res = await HealthService.fetchList({
        page: pagination.page + 1,
        limit: pagination.limit ?? 8,
        category: activeCategory ?? undefined,
      });

      setItems((prev) => [...prev, ...(res?.payload?.data || [])]);
      setPagination(res?.payload?.pagination || pagination);
    } catch (error) {
      setPagination((prev) => ({
        ...prev,
        hasMore: false,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-12">
        {items.map((article) => (
          <div key={article.id} className="flex flex-col">
            <div className="relative">
              <SmartImage
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={240}
                height={144}
                aspectRatio="wide"
                objectFit="cover"
              />
              <div className="absolute bottom-0 left-0 bg-[#FFCC21] text-white px-2 py-1 text-xs">
                {article.date} {article.date.includes(":") ? "" : "23:25"}
              </div>
            </div>

            <p className="text-sm font-semibold mt-2 line-clamp-2">
              {article.title}
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {article.tags?.map((tag: string, index: number) => (
                <span key={index} className="text-xs text-[#FF963C]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {pagination.hasMore && (
        <div className="flex justify-center mt-8 mb-12">
          <FetchMoreButton onFetch={handleLoadMore} initialLoading={loading} />
        </div>
      )}
    </>
  );
};

export default HealthList;
