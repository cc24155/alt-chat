"use client";
import Button from "../components/Button";
import Footer from "../components/Footer";
import NavigationBlue from "../components/NavigationBlue";
import PicCard from "../components/PictogramaSection";
import { Pictograma, buscarFavoritos } from "../../arasaac api/arasaac";
import { useEffect, useState } from "react";
import { PictogramasGrid } from "../components/PictogramaSection";
import { useRouter } from "next/navigation";

export default function ModoAprendizadoPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationBlue/>
      <main className="flex-grow py-20 flex flex-col gap-12 justify-center">
        <h1 className="text-center font-title uppercase">
          Modo Aprendizado
        </h1>
        
        <div>
          <p className="text-center font-body text-foreground/80 mb-8">
            Exercício 1: Relacione os pictogramas às palavras corretas.
          </p>
                  
        {/* Container centralizado que "prende" o card */}
        <div className="flex justify-center w-full">
          
          {/* AQUI cravamos o tamanho: w-[120px] deixa ele com 120 pixels. Se quiser ainda menor, mude para 100px, 80px... */}
          <div className="w-[120px] pointer-events-none">
            <PicCard  
              pic={{
                _id: 9879,
                keywords: [
                  { keyword: "Gato" }
                ]
              }} 
            />
          </div>

        </div>
          
        </div>
      </main>
      <Footer/>
    </div>    
  );
}