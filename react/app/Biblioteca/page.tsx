"use client";
import { useEffect } from "react";

import NavigationBlue from "../components/NavigationBlue";
import HeroSection from "../components/HeroSection";
import Contato from "../components/Contato";
import Footer from "../components/Footer";

import { usePictogramas } from "../../arasaac api/arasaac";
import { PictogramasGrid } from "../components/PictogramaSection";


export default function BibliotecaPage() {
  const { q, categorias, resultados, loading } = usePictogramas([
    "Pessoas", "Animais", "Alimentos", "Ações", "Objetos"
  ]);

  // quando terminar de carregar E tiver uma busca, rola até os resultados
  useEffect(() => {
    if (!loading && q) {
      document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, q]);

  if (loading)
    return <div className="text-foreground text-center py-20">Carregando...</div>;


  return (
    <section className="w-full bg-background px-8 py-12 flex flex-col gap-8">
      <NavigationBlue/>

      <HeroSection
        title="Biblioteca"
        redirectTo="/Biblioteca"
        showScroll={false}
      />

      {/* PICTOGRAMAS */}
      <div id="resultados">
        <PictogramasGrid q={q} resultados={resultados} categorias={categorias} />
      </div>
     
      <Contato/>
      <Footer/>
    </section>
  );
}
