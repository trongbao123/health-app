"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface MainDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MainDrawer({ isOpen, onClose }: MainDrawerProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  const handleLogout = async () => {
    await logout();
    onClose();
    router.push("/auth/login");
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        ref={menuRef}
        className="fixed right-0 top-0 h-full w-[280px] bg-[#777777] text-white transition-transform duration-300 ease-in-out"
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>

        {user && (
          <div className="px-4 py-3 bg-[#414141]">
            <p className="font-bold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>
        )}

        <nav className="flex flex-col">
          {MENU_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="py-5 px-4 border-b border-[#707070] hover:bg-[#414141] transition-colors"
            >
              {label}
            </Link>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="py-5 px-4 border-b border-[#707070] hover:bg-[#414141] transition-colors text-left flex items-center gap-2"
            >
              <LogOut size={20} />
              ログアウト
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}

const MENU_ITEMS = [
  { href: "/my-record", label: "自分の記録" },
  { href: "/weight-graph", label: "体重グラフ" },
  { href: "/goals", label: "目標" },
  { href: "/selected-course", label: "選択中のコース" },
  { href: "/health", label: "コラム一覧" },
  { href: "/settings", label: "設定" },
];
