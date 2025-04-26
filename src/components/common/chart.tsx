"use client";

import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
type ViewMode = "day" | "week" | "month" | "year";

interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface DataPoint {
  date: string;
  weight: number;
  fat: number;
}

type Props = {
  data: DataPoint[];
  className?: string;
  title?: string;
  showFilter?: boolean;
  initialView?: ViewMode;
  margin?: ChartMargin;
  isLoading?: boolean;
};

const viewModeLabels: Record<ViewMode, string> = {
  day: "日",
  week: "週",
  month: "月",
  year: "年",
};

const filterData = (data: DataPoint[], mode: ViewMode): DataPoint[] => {
  const sliceMap: Record<ViewMode, number> = {
    day: 1,
    week: 7,
    month: 30,
    year: data?.length ?? 0,
  };

  return (data ?? []).slice(-sliceMap[mode]);
};

const Chart: React.FC<Props> = ({
  data,
  className,
  title,
  showFilter = false,
  initialView = "year",
  isLoading = false,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const filteredData = useMemo(
    () => filterData(data, viewMode),
    [data, viewMode]
  );

  return (
    <div
      className={cn(
        "chart-container w-full h-full bg-[#2E2E2E] flex flex-col xl:px-[50px] ",
        className
      )}
    >
      {title && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-white text-lg">{title}</div>
        </div>
      )}
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center w-full h-[300px] bg-[#2E2E2E] rounded-lg"
        >
          <div className="text-white text-lg">Loading Chart...</div>
        </motion.div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ ...margin }}>
            <XAxis
              dataKey="date"
              stroke="#ccc"
              interval={0}
              tickLine={false}
              axisLine={false}
            />

            <YAxis hide />

            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#FFCC21"
              strokeWidth={3}
              dot
            />
            <Line
              type="monotone"
              dataKey="fat"
              stroke="#8FE9D0"
              strokeWidth={3}
              dot
            />
            {data.map((_, idx) => (
              <ReferenceLine
                key={idx}
                x={_.date}
                stroke="#888"
                strokeWidth={1}
                ifOverflow="visible"
                fontSize={3}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}

      {showFilter && (
        <div className="flex gap-2 mt-[20px]">
          {(Object.keys(viewModeLabels) as ViewMode[]).map((mode) => (
            <button
              key={mode}
              className={`${
                viewMode === mode
                  ? "bg-[#FFCC21] text-white"
                  : "bg-white text-[#FFCC21]"
              } rounded-full px-4 py-1 text-sm transition-colors`}
              onClick={() => setViewMode(mode)}
              aria-label={`View by ${mode}`}
            >
              {viewModeLabels[mode]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chart;
