import dynamic from "next/dynamic";
import { BodyProgressService } from "@/services/client/body-progress/body-progress.service";
import { MealService } from "@/services/client/meal/meal.service";
import ScrollToTop from "@/components/common/scroll-to-top";
import PageWrapper from "@/components/common/page-wrapper";
import MealLoader from "@/components/pages/meals/meal-loader";
import { DEFAULT_PAGINATION } from "@/constants/pagination";

const FoodMenu = dynamic(() => import("@/components/pages/meals/food-menu"), {
  loading: () => <MealLoader />,
});
const MealsList = dynamic(() => import("@/components/pages/meals/list"), {
  loading: () => <MealLoader />,
});
const ProgressSummary = dynamic(
  () => import("@/components/pages/meals/progress-summary"),
  { loading: () => <MealLoader /> }
);

const loadHomeInitialData = async () => {
  const [progressRes, mealsRes] = await Promise.all([
    BodyProgressService.fetchProgressHistory(),
    MealService.fetchList({ limit: 8 }),
  ]);

  return {
    progress: progressRes?.payload ?? { achievementRate: 0, bodyProgress: [] },
    meals: mealsRes?.payload ?? { data: [], pagination: DEFAULT_PAGINATION },
  };
};

const Home = async () => {
  const { progress, meals } = await loadHomeInitialData();

  return (
    <div className="min-h-screen">
      <ProgressSummary
        achievementRate={progress.achievementRate}
        records={progress.bodyProgress}
      />
      <PageWrapper className="py-8">
        <FoodMenu />
        <MealsList
          initialMeals={meals.data}
          initialPagination={meals.pagination}
        />
      </PageWrapper>
      <ScrollToTop />
    </div>
  );
};

export default Home;
