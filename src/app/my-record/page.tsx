import { DEFAULT_PAGINATION } from "@/constants/pagination";
import PageWrapper from "@/components/common/page-wrapper";
import ScrollToTop from "@/components/common/scroll-to-top";
import { DiaryService } from "@/services/client/diaries/diary.service";
import { BodyProgressService } from "@/services/client/body-progress/body-progress.service";
import dynamic from "next/dynamic";
import RecordLoading from "@/components/pages/records/loading";
import { RecordHistoryService } from "@/services/client/record-history/record-history.service";
const Category = dynamic(
  () => import("@/components/pages/records/category-grid"),
  {
    loading: () => <RecordLoading />,
  }
);

const BodyProgressChart = dynamic(() => import("@/components/common/chart"), {
  loading: () => <RecordLoading />,
});

const Dyary = dynamic(() => import("@/components/pages/diaries/diary-grid"), {
  loading: () => <RecordLoading />,
});

const Excercise = dynamic(
  () => import("@/components/pages/record-history/my-excercise"),
  {
    loading: () => <RecordLoading />,
  }
);

const RECORD_CATEGORIES = [
  {
    title: "BODY RECORD",
    subtitle: "自分のカラダの記録",
    imageSrc: "/images/MyRecommend-1.jpg",
    href: "#body-record",
  },
  {
    title: "MY EXERCISE",
    subtitle: "自分の運動の記録",
    imageSrc: "/images/MyRecommend-2.jpg",
    href: "#my-exercise",
  },
  {
    title: "MY DIARY",
    subtitle: "自分の日記",
    imageSrc: "/images/MyRecommend-3.jpg",
    href: "#my-diary",
  },
];

const chartMargin = { top: 0, right: 20, bottom: 20, left: 20 };

const Record = async () => {
  const [dashboard, exercises, diaries] = await Promise.all([
    BodyProgressService.fetchProgressHistory().catch(() => ({
      success: false,
      payload: {
        bodyProgress: [],
        achievementRate: 0,
      },
    })),
    RecordHistoryService.fetchList({ limit: 8 }).catch(() => ({
      success: false,
      payload: {
        data: [],
        pagination: DEFAULT_PAGINATION,
      },
    })),
    DiaryService.fetchList({ limit: 8 }).catch(() => ({
      success: false,
      payload: {
        data: [],
        pagination: DEFAULT_PAGINATION,
      },
    })),
  ]);

  return (
    <PageWrapper className="py-8">
      <Category categories={RECORD_CATEGORIES} />
      <section id="body-record" className="bg-[#414141] p-4 mb-12">
        <div className="flex items-center mb-4">
          <h3 className="text-white text-xl mr-8">BODY RECORD</h3>
          <span className="text-white">2021.05.21</span>
        </div>
        <div className="h-[304px]">
          <BodyProgressChart
            data={dashboard?.payload?.bodyProgress ?? []}
            margin={chartMargin}
            showFilter={true}
            className="!bg-transparent xl:!px-[20px]"
          />
        </div>
      </section>
      <Excercise excercises={exercises?.payload?.data ?? []} />
      <section id="my-diary" className="mb-12">
        <h3 className="text-xl font-bold mb-4">MY DIARY</h3>
        <Dyary
          initialDiaries={diaries?.payload?.data ?? []}
          initialPagination={diaries?.payload?.pagination ?? {}}
        />
      </section>
      <ScrollToTop />
    </PageWrapper>
  );
};

export default Record;
