"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

import "swiper/css";
import "swiper/css/pagination";

type MenuItem = {
  icon: string;
  label: string;
  alt: string;
};

const items: MenuItem[] = [
  { icon: "/images/icons/ic-knife.svg", label: "Morning", alt: "Morning" },
  { icon: "/images/icons/ic-knife.svg", label: "Lunch", alt: "Lunch" },
  { icon: "/images/icons/ic-knife.svg", label: "Dinner", alt: "Dinner" },
  { icon: "/images/icons/ic-cup.svg", label: "Snack", alt: "Snack" },
];

const MenuCard = ({ icon, label, alt }: MenuItem) => (
  <div className="hexagon">
    <Image src={icon} alt={alt} width={56} height={56} className="mb-2" />
    <span className="text-xl">{label}</span>
  </div>
);

export default function FoodMenu() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="mb-8">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={16}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          style={{ paddingBottom: "32px" }}
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{ minWidth: "145px", maxWidth: "145px" }}
            >
              <MenuCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 mb-8">
      {items.map((item, index) => (
        <MenuCard key={index} {...item} />
      ))}
    </div>
  );
}
