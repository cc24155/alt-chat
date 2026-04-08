"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  heroImage?: string;
  redirectTo?: string;
  showScroll?: boolean;
}

export default function HeroSection(
{
    title = "ALT-CHAT",
    subtitle = "PESQUISE QUALQUER PICTOGRAMA",
    heroImage = "/Hero.png",
    redirectTo = "/Biblioteca",
    showScroll = true,
}: HeroSectionProps) {
        
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    router.push(`${redirectTo}?q=${encodeURIComponent(search)}`);
  };

  return (
    <section
      id="biblioteca"
      className="relative w-full min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden pt-[72px]"
      aria-label="Biblioteca"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 flex flex-col items-center text-center gap-8">
        <h1 className="font-title text-[clamp(48px,7vw,70px)] font-normal tracking-[-0.7px] leading-[80%] text-foreground max-w-[900px]">
          {title}
        </h1>

        <p className="font-body font-normal tracking-[-0.075px] leading-[140%] text-foreground max-w-[560px]">
          {subtitle}
        </p>

        <div className="relative">
          <img src={heroImage} alt="Hero" className="w-full h-auto" />

          <div className="absolute inset-0 flex items-start justify-center pt-15 sm:pt-20 md:pt-40 z-10">
            <div className="flex items-center justify-between bg-background w-[250px] sm:w-[350px] md:w-[500px] h-[40px] sm:h-[45px] md:h-[55px] px-6 py-2 border border-foreground rounded-full">
              <input
                type="text"
                placeholder="Pesquise"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-transparent outline-none border-none text-xs sm:text-base md:text-lg font-bold text-foreground placeholder:text-foreground placeholder:font-bold"
              />
              <Button
                onClick={handleSearch}
                text={<img className="icon-search" alt="search icon" />}
                className="!p-0 !w-8 !h-8 sm:!w-10 sm:!h-10 flex items-center justify-center !shadow-none !border-none hover:!bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {showScroll && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-body text-[12px] tracking-[1.62px] text-foreground uppercase">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="14" height="22" rx="7" className="stroke-foreground" strokeWidth="1.5" />
            <rect x="7" y="5" width="2" height="5" rx="1" className="fill-foreground" />
          </svg>
        </div>
      )}
    </section>
  );
}
