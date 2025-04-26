import Link from "next/link";
import PageWrapper from "@/components/common/page-wrapper";

const links = [
  { href: "/terms", label: "会員登録" },
  { href: "/company", label: "運営会社" },
  { href: "/terms-of-service", label: "利用規約" },
  { href: "/privacy", label: "個人情報の取扱について" },
  { href: "/commercial", label: "特定商取引法に基づく表記" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Footer() {
  return (
    <footer className="footer py-[54px]">
      <PageWrapper>
        <nav className="flex flex-wrap gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-nowrap hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      </PageWrapper>
    </footer>
  );
}
