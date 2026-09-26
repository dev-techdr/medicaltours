"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

type AppChromeProps = {
  children: React.ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isDomesticSection =
    pathname.startsWith("/india") || pathname.startsWith("/te");
  const hideGlobalChrome = isDomesticSection;

  return (
    <>
      {!hideGlobalChrome ? <Header /> : null}
      <main className={`min-w-0 flex-1 ${hideGlobalChrome ? "" : "pb-28 sm:pb-24"}`}>
        {children}
      </main>
      {!hideGlobalChrome ? <Footer /> : null}
      {!hideGlobalChrome ? <FloatingContact /> : null}
    </>
  );
}
