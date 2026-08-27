import type { Metadata } from "next";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";
import GlassDock from "@/components/GlassDock";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
    >
      <body className="min-h-full bg-[#020617] text-slate-100 antialiased selection:bg-violet-500/30">
        <AmbientBackground />
        <div className="relative z-10">
          {children}
        </div>
        <GlassDock />
      </body>
    </html>
  );
}
