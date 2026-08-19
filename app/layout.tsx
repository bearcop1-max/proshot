import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProShot — 셀카 한 장으로 AI 프로필 사진",
  description: "단 한 장의 셀카로 완성하는 가장 자연스럽고 전문적인 AI 비즈니스 헤드샷 및 프로필 사진 서비스.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKr.variable}`}>
      <body className="font-sans antialiased text-slate-900 bg-slate-50/50 min-h-screen">
        {children}
      </body>
    </html>
  );
}

