
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isEnglish } = useLanguage();
  const isMobile = useIsMobile();
  const fontClass = isEnglish ? "font-inter" : "font-hind-siliguri";

  return (
    <div className={`min-h-screen w-full bg-background ${fontClass}`}>
      {/* Desktop Sidebar - fixed on left side */}
      <Sidebar />

      {/* Main content - offset for desktop sidebar, below mobile header */}
      <main className={`min-h-screen ${isMobile ? "pt-16" : "md:pl-64"}`}>
        <div className={`container ${isMobile ? "px-4 py-4" : "px-6 py-6"} max-w-7xl`}>
          {children}
        </div>
      </main>
    </div>
  );
}
