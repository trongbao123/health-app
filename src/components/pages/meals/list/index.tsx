"use client";

import FetchMoreButton from "@/components/common/fetch-more-button";
import SmartImage from "@/components/common/smart-image";
import { DEFAULT_PAGINATION } from "@/constants/pagination";
import { MealService } from "@/services/client/meal/meal.service";
import { useState } from "react";

interface MealsListProps {
  initialMeals: any[];
  initialPagination: { page: number; hasMore: boolean };
}

const MealsList: React.FC<MealsListProps> = ({
  initialMeals,
  initialPagination,
}) => {
  const [meals, setMeals] = useState(initialMeals);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    if (isLoading || !pagination.hasMore) return;
    setIsLoading(true);
    try {
      const nextPage = pagination.page + 1;

      const { payload } = await MealService.fetchList({
        page: nextPage,
        limit: 8,
      });
      const { data: newMeals, pagination: newPagination } = payload ?? {
        data: [],
        pagination: DEFAULT_PAGINATION,
      };
      setMeals((prev) => [...prev, ...newMeals]);
      setPagination(newPagination);
    } catch (error) {
      setPagination((prev) => ({
        ...prev,
        hasMore: false,
      }));
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
        {(Array.isArray(meals) ? meals : []).map((meal) => (
          <div key={meal.id} className="relative h-full">
            <SmartImage
              src={meal.image}
              alt={meal.type}
              width={234}
              height={234}
              aspectRatio="square"
              containerClassName="h-full"
            />
            <div className="absolute bottom-0 left-0 bg-[#FFCC21] text-white px-2 py-1">
              {meal.date}.{meal.type}
            </div>
          </div>
        ))}
      </div>

      {pagination?.hasMore && (
        <div className="flex justify-center mt-4">
          <FetchMoreButton
            onFetch={loadMore}
            label="記録をもっと見る"
            initialLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};

export default MealsList;
