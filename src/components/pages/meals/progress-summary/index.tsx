"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import BodyProgressChart from "@/components/common/chart";

interface ProgressRecord {
  date: string;
  weight: number;
  fat: number;
}

interface ProgressSummaryProps {
  achievementRate: number;
  records: ProgressRecord[];
  initialDate?: string;
}

export default function ProgressSummary({
  achievementRate,
  records,
  initialDate,
}: ProgressSummaryProps) {
  const [mounted, setMounted] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [currentDate, setCurrentDate] = useState(initialDate ?? "05/21");

  useEffect(() => {
    setMounted(true);

    if (!initialDate) {
      const today = new Date();
      setCurrentDate(
        `${String(today.getMonth() + 1).padStart(2, "0")}/${String(
          today.getDate()
        ).padStart(2, "0")}`
      );
    }
  }, [initialDate]);

  return (
    <div className="flex flex-col md:flex-row md:grid md:grid-cols-[540px_1fr] grid-cols-1">
      <LeftPanel
        date={currentDate}
        rate={achievementRate}
        imageReady={imageReady}
        onImageLoad={() => setImageReady(true)}
        isLoading={!mounted}
      />
      <RightPanel data={records} isLoading={!mounted} />
    </div>
  );
}

function LeftPanel({
  date,
  rate,
  imageReady,
  onImageLoad,
  isLoading,
}: {
  date: string;
  rate: number;
  imageReady: boolean;
  onImageLoad: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="relative w-full h-[316px] overflow-hidden">
      {isLoading ? (
        <CircleSkeleton />
      ) : (
        <AchievementCircle date={date} rate={rate} />
      )}
      <BackgroundImage loaded={imageReady} onLoad={onImageLoad} />
    </div>
  );
}

function RightPanel({
  data,
  isLoading,
}: {
  data: ProgressRecord[];
  isLoading: boolean;
}) {
  return (
    <div className="w-full h-[316px] bg-[#2E2E2E]">
      {isLoading ? <ChartSkeleton /> : <BodyProgressChart data={data} />}
    </div>
  );
}

function AchievementCircle({ rate, date }: { rate: number; date: string }) {
  const circleRadius = 180;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <div className="relative w-[181px] h-[181px]">
        <svg width="0" height="0">
          <defs>
            <filter
              id="enhanced-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="10" result="blur1" />
              <feGaussianBlur stdDeviation="6" result="blur2" />
              <feFlood floodColor="rgba(255, 150, 60, 1)" result="color" />
              <feComposite
                in="color"
                in2="blur1"
                operator="in"
                result="glow1"
              />
              <feComposite
                in="color"
                in2="blur2"
                operator="in"
                result="glow2"
              />
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="glow2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full"
        >
          <circle
            stroke="rgba(255, 150, 60, 0.7)"
            r="180"
            cy="200"
            cx="200"
            strokeWidth="8"
            fill="transparent"
            filter="url(#enhanced-glow)"
            strokeDasharray={`${2 * Math.PI * 180 * (rate / 100)} ${
              2 * Math.PI * 180
            }`}
            transform="rotate(-90, 200, 200)"
            className="glow-circle"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full"
        >
          <circle
            stroke="#ffffff"
            r="180"
            cy="200"
            cx="200"
            strokeWidth="8"
            fill="transparent"
            className="circle1"
            strokeDasharray={`${2 * Math.PI * 180 * (rate / 100)} ${
              2 * Math.PI * 180
            }`}
            transform="rotate(-90, 200, 200)"
          />
        </svg>

        <div className="absolute inset-0 rounded-full blur-effect"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="gap-[4px] flex items-end justify-center text-white">
            <div className="leading-none text-[18px] text-shadow-orange">
              {date}
            </div>
            <div className="text-[25px] leading-none text-shadow-orange">
              {rate}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BackgroundImage({
  loaded,
  onLoad,
}: {
  loaded: boolean;
  onLoad: () => void;
}) {
  return (
    <>
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/images/d01.jpg"
          alt="Meal"
          width={540}
          height={316}
          className="w-full h-full object-cover"
          onLoad={() => onLoad()}
          priority
        />
      </div>
      {!loaded && <div className="absolute inset-0 bg-gray-800"></div>}
    </>
  );
}

function CircleSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[181px] h-[181px] rounded-full bg-gray-700 animate-pulse" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-full w-full bg-[#2E2E2E] p-6">
      <div className="h-full relative overflow-hidden">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="absolute left-0 w-full border-b border-gray-700"
            style={{ bottom: `${(idx / 6) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
