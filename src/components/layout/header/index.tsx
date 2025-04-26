"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { MainDrawer } from "@/components/common/main-drawer";
import PageWrapper from "@/components/common/page-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <header className="sticky top-0 z-50 bg-[#414141] shadow-md">
      <PageWrapper>
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/healthy-app-logo.svg"
              alt="Healthy App Logo"
              width={109}
              height={40}
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-white hover:text-[#FF963C]"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                  />
                  {item.label}
                  {item.badge && (
                    <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF963C] text-xs text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              <DropdownMenu dir="ltr">
                <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 text-white hover:text-[#FF963C]">
                  <Image
                    src="/images/icon-menu.svg"
                    alt="User"
                    width={32}
                    height={32}
                    quality={100}
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="p-0 bg-[#777777] rounded-none"
                >
                  {MENU_ITEMS.map((item, index) => (
                    <div key={index}>
                      <Link href={item.href}>
                        <DropdownMenuLabel className="cursor-pointer w-[280px] h-[72px] flex items-center bg-[#777777] p-7 font-light text-[18px] leading-[26px] text-white hover:bg-[#414141] transition-colors">
                          {item.label}
                        </DropdownMenuLabel>
                      </Link>
                      <DropdownMenuSeparator className="my-0 bg-gray-500 h-[1px]" />
                    </div>
                  ))}

                  <button onClick={handleLogout} className="w-full text-left">
                    <DropdownMenuLabel className="cursor-pointer w-[280px] h-[72px] flex items-center bg-[#777777] p-7 font-light text-[18px] leading-[26px] text-white gap-2 hover:bg-[#414141] transition-colors">
                      <LogOut size={20} />
                      ログアウト
                    </DropdownMenuLabel>
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            <button onClick={toggleDrawer} className="text-[#FF963C] md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </PageWrapper>

      <MainDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </header>
  );
}

const NAV_ITEMS = [
  {
    href: "/my-record",
    label: "自分の記録",
    icon: "/images/icons/ic-check-list.svg",
  },
  {
    href: "/challenge",
    label: "チャレンジ",
    icon: "/images/icons/ic-reward.svg",
  },
  {
    href: "/notification",
    label: "お知らせ",
    icon: "/images/icons/ic-info.svg",
    badge: 1,
  },
];

const MENU_ITEMS = [
  { href: "/my-record", label: "自分の記録" },
  { href: "/weight-graph", label: "体重グラフ" },
  { href: "/goals", label: "目標" },
  { href: "/selected-course", label: "選択中のコース" },
  { href: "/health", label: "コラム一覧" },
  { href: "/settings", label: "設定" },
];
