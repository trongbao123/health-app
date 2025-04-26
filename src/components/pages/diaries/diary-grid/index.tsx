"use client";

import { useState } from "react";
import FetchMoreButton from "@/components/common/fetch-more-button";
import { DiaryService } from "@/services/client/diaries/diary.service";

type Diary = {
  id: number;
  date: string;
  time: string;
  content: string;
};

type DiaryListProps = {
  initialDiaries: Diary[];
  initialPagination: {
    page: number;
    hasMore: boolean;
  };
};

const DiaryGrid: React.FC<DiaryListProps> = ({
  initialDiaries,
  initialPagination,
}: DiaryListProps) => {
  const [diaries, setDiaries] = useState<Diary[]>(initialDiaries);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (loading || !pagination.hasMore) return;

    setLoading(true);
    try {
      const res = await DiaryService.fetchList({
        page: pagination.page + 1,
        limit: 8,
      });

      setDiaries((prev) => [...prev, ...res?.payload?.data]);
      setPagination(res?.payload?.pagination);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {Array.isArray(diaries) &&
          diaries?.map((entry) => (
            <div key={entry.id} className="border border-[#707070] p-4">
              <p className="font-bold">{entry.date}</p>
              <p className="font-bold">{entry.time}</p>
              <p className="text-sm mt-2">{entry.content}</p>
            </div>
          ))}
      </div>

      {pagination.hasMore && (
        <div className="flex justify-center mt-8 mb-12">
          <FetchMoreButton
            onFetch={handleLoadMore}
            label="自分の日記をもっと見る"
            initialLoading={loading}
          />
        </div>
      )}
    </>
  );
};

export default DiaryGrid;
