"use client";

import ProgressBar from "@/components/common/progress-bar";
import { AuthProvider } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { Header } from "../header";
import Footer from "../footer";

const authPaths = ["/auth/login"];

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = authPaths.includes(pathname);

  return (
    <AuthProvider>
      <body>
        <ProgressBar />
        {!isAuthPage && <Header />}
        <main>{children}</main>
        {!isAuthPage && <Footer />}
      </body>
    </AuthProvider>
  );
}
