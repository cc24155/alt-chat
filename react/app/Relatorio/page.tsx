"use client";
import { useEffect, useState } from "react";

import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";
import Link from "next/link";
import Button from "../components/Button"; 
import HeroSection from "../components/HeroSection";

import { Pictograma, buscarFavoritos } from "../utils/arasaac"; 
import { PictogramasGrid } from "../components/PicCard";


export default function RelatorioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationBlue/>

        <main className="flex-grow py-20 flex flex-col gap-12 justify-center">
          <h1 className="text-center font-title uppercase">
            Relatório
          </h1>

          <div className = "max-w-2xl mx-auto bg-background rounded-3xl p-10 shadow-figma">
            {/* Grid: Coluna 1 (Texto) | Coluna 2 (Barra) */}
            <div className="grid grid-cols-[1fr_200px] items-center gap-y-6 gap-x-4">

              <span className="font-body text-foreground/80 text-center">
                Tempo médio de uso
              </span>
              <div className="w-full h-6 bg-foreground/10 rounded-full overflow-hidden">  {/* Fundo temporário */}
                <div className="bg-primary h-full rounded-full" style={{ width: '45%' }} />
              </div>
      
              <span className="font-body text-foreground/80 text-center">
                Pictogramas diários
              </span>
              <div className="w-full h-6 bg-foreground/10 rounded-full overflow-hidden">  {/* Fundo temporário */}
                <div className="bg-primary h-full rounded-full" style={{ width: '55%' }} />
              </div>

              <span className="font-body text-foreground/80 text-center">
                Acertos no Modo Aprendizado
              </span>
              <div className="w-full h-6 bg-foreground/10 rounded-full overflow-hidden">  {/* Fundo temporário */}
                <div className="bg-primary h-full rounded-full" style={{ width: '75%' }} />
              </div>

            </div>
          </div>
        </main>

      <Footer/>
    </div>
  );
}
