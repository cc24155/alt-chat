"use client";
import { useEffect, useState } from "react";
import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";
import Link from "next/link";
import Button from "../components/Button"; 
import HeroSection from "../components/HeroSection";

interface Pictograma {
  _id: number;
  keywords: { keyword: string }[];
}


function PicCard({ pic }: { pic: Pictograma }) {
  return (
    <div className="border border-foreground/10 rounded-3xl p-4 flex items-center justify-center aspect-square bg-neutral shadow-figma hover:shadow-figma-hover transition-all cursor-pointer">
      <img
        src={`https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`}
        alt={pic.keywords?.[0]?.keyword ?? "pictograma"}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
export default function RelatorioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationBlue/>
        <main className="flex-grow py-20 flex flex-col gap-12 justify-center">
          <h1 className="text-center font-title uppercase">
            Relatório
          </h1>
          <div className = "max-w-2xl mx-auto bg-background rounded-3xl p-10 shadow-figma">
            <div className="grid grid-cols-[200px_1fr] items-center gap-y-6 gap-x-4">
              <span className="font-body text-sm text-foreground/80 text-center">
                Tempo médio de uso
              </span>
              <div className="w-full h-6 bg-red-500 rounded-full" /> {/* Fundo vermelho temporário */}
              <span className="font-body text-sm text-foreground/80 text-center">
                Pictogramas diários
              </span>
              <div className="w-full h-6 bg-red-500 rounded-full" />
              <span className="font-body text-sm text-foreground/80 text-center">
                Acertos no Modo Aprendizado
              </span>
              <div className="w-full h-6 bg-red-500 rounded-full" />
            </div>
          </div>
        </main>
      <Footer/>
    </div>
  );
}