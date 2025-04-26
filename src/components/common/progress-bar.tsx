"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    setVisible(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [pathname]);

  useEffect(() => {
    if (progress === 90) {
      const completeTimeout = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 300);
      }, 300);

      return () => clearTimeout(completeTimeout);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-[#FFCC21] z-50">
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
