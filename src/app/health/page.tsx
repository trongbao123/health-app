import { DEFAULT_PAGINATION } from "@/constants/pagination";
import { HealthService } from "@/services/client/health/health.service";
import PageWrapper from "@/components/common/page-wrapper";
import ScrollToTop from "@/components/common/scroll-to-top";
import dynamic from "next/dynamic";

const HealthList = dynamic(() => import("@/components/pages/healths/list"), {
  loading: () => <div className="py-8 text-center">Loading...</div>,
});
const CATEGORY_LIST = [
  { title: "COLUMN", subtitle: "オススメ" },
  { title: "DIET", subtitle: "ダイエット" },
  { title: "BEAUTY", subtitle: "美容" },
  { title: "HEALTH", subtitle: "健康" },
];

async function fetchHealthData() {
  try {
    return await HealthService.fetchList({ limit: 8 });
  } catch (error) {
    return {
      success: false,
      payload: {
        data: [],
        pagination: DEFAULT_PAGINATION,
      },
    };
  }
}

const Health = async () => {
  const columnsResponse = await fetchHealthData();

  return (
    <PageWrapper className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {CATEGORY_LIST.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[#2E2E2E] py-6 px-4"
          >
            <h3 className="text-[#FFCC21] text-[22px] text-center">
              RECOMMENDED
              <br />
              {item.title}
            </h3>
            <div className="w-14 h-[1px] bg-white my-2"></div>
            <p className="text-white text-lg">{item.subtitle}</p>
          </div>
        ))}
      </div>
      <HealthList
        initialItems={columnsResponse?.payload?.data}
        initialPagination={columnsResponse?.payload?.pagination}
      />
      <ScrollToTop />
    </PageWrapper>
  );
};

export default Health;
