"use client";

import NavigationBlue from "../components/NavigationBlue";
import HeroSection from "../components/HeroSection";
import Contato from "../components/Contato";
import Footer from "../components/Footer";

import { usePictogramas } from "../utils/arasaac";
import { PictogramasGrid } from "../components/PicCard";


export default function BibliotecaPage() {
  const { q, categorias, resultados, loading } = usePictogramas([
    "Pessoas", "Animais", "Alimentos", "Ações", "Objetos"
  ]);
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
      <PictogramasGrid q={q} resultados={resultados} categorias={categorias} />
      
      <Contato/>
      <Footer/>
    </section>
  );
}
