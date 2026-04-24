"use client";
import { useEffect, useState } from "react";

import NavigationBlue from "../components/NavigationBlue";
import HeroSection from "../components/HeroSection";
import Contato from "../components/Contato";
import Footer from "../components/Footer";
import { EstaLogado } from "../actions";

import { usePictogramas } from "../../arasaac api/arasaac";
import { PictogramasGrid } from "../components/PictogramaSection";
import NavBar from "../components/NavBar";


export default function BibliotecaPage() {
  const { q, categorias, resultados, loading } = usePictogramas([
    "Pessoas", "Animais", "Alimentos", "Ações", "Objetos"
  ]);

  const [logado, setLogado] = useState<boolean | null>(null); // null significa "carregando"

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const result = await EstaLogado();
        setLogado(!!result?.success); // o primeiro ! inverte o valor, e o segundo transforma coisas que não são booleanos em booleanos também
      } // exemplo: valor inicial : null    1ª exclamação:  true    2ª exclamação: false
      catch (e) {
        console.error("Deu erro: ", e);
        setLogado(false);
      }
    };
    verificarLogin();
  }, []);

  // quando terminar de carregar E tiver uma busca, rola até os resultados
  useEffect(() => {
    if (!loading && q) {
      document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, q]);

  if (loading)
    return <div className="text-foreground text-center py-20">Carregando...</div>;

  const qualBarraNavegacao = logado ? <NavigationBlue /> : <NavBar />;
  console.log(logado);
  //se é true, navigationblue, se não é, navbar

  return (
    <section className="w-full bg-background px-8 py-12 flex flex-col gap-8">
      {qualBarraNavegacao}

      <HeroSection
        title="Biblioteca"
        redirectTo="/Biblioteca"
        showScroll={false}
      />

      {/* PICTOGRAMAS */}
      <div id="resultados">
        <PictogramasGrid q={q} resultados={resultados} categorias={categorias} />
      </div>

      <Contato />
      <Footer />
    </section>
  );
}
