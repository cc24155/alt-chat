"use client";
import { useEffect, useState } from "react";

import NavigationBlue from "../components/NavigationBlue";
import HeroSection from "../components/HeroSection";
import Contato from "../components/Contato";
import Footer from "../components/Footer";
import { EstaLogado } from "../actions";

import { usePictogramas, PictogramasGrid } from "../components/PictogramaSection";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import { Pictograma } from "@/arasaac api/arasaac";


export default function FrasesPage() {
  const router = useRouter();

  const { q, categorias, resultados, loading } = usePictogramas([
    "Pessoas", "Animais", "Alimentos", "Ações", "Objetos"
  ]);

  const [logado, setLogado] = useState<boolean | null>(null); // null significa "carregando"
  const [sugestoesIA, setSugestoesIA] = useState<Pictograma[]>([]);

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


  // CAPTURA A DIGITAÇÃO, PEGA A ÚLTIMA PALAVRA E BUSCA A SUGESTÃO DA IA
  useEffect(() => {
    const obterSugestaoDinamica = async () => {
      if (!loading && q && resultados && resultados.length > 0) {

        // 1. LIMPEZA INTELIGENTE: Pega o texto da barra de busca, limpa espaços extras e separa por palavras
        const palavrasDigitadas = q.trim().split(/\s+/);
        // Pega a última palavra que o usuário escreveu (Ex: de "eu quero", pega "quero")
        const ultimaPalavra = palavrasDigitadas[palavrasDigitadas.length - 1].toLowerCase();

        // 2. Procura na lista de resultados qual card realmente bate com a última palavra digitada
        // Isso evita que o sistema envie IDs de relógios ou lixos que o ARASAAC trouxe de penetra
        const cardCorreto = resultados.find(pic =>
          pic.keywords?.some(kw => kw.keyword.toLowerCase() === ultimaPalavra)
        ) || resultados[0]; // Caso não ache idêntico, usa o primeiro como plano B

        const idNumerico = Number(cardCorreto._id);
        if (isNaN(idNumerico)) return;

        try {
          const response = await fetch("http://localhost:8000/sugerir", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_atual: idNumerico }),
          });

          const dados = await response.json();
          setSugestoesIA(dados.sugestoes);
        } catch (erro) {
          console.error("Erro ao chamar a IA:", erro);
        }
      } else {
        setSugestoesIA([]);
      }
    };

    obterSugestaoDinamica();
  }, [q, resultados, loading]);


  // quando terminar de carregar E tiver uma busca, rola até os resultados
  useEffect(() => {
    if (!loading && q) {
      document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, q]);

  if (loading)
    return <div className="text-foreground text-center py-20">Carregando...</div>;

  const qualBarraNavegacao = logado ? <NavigationBlue /> : <NavBar />;

  //se é true, navigationblue, se não é, navbar


  return (
    <section className="w-full bg-background px-8 py-12 flex flex-col gap-8">
      {qualBarraNavegacao}

      <HeroSection
        title="Frases"
        redirectTo="/Frases"
        showScroll={false} 
        textButton={"Pesquise pictogramas"} 
        routerPushButton={"/Biblioteca"}     
      />

      {/* SEÇÃO DA COSTRUÇÃO DE FRASES + PREDITIVO */}
      {q && resultados && resultados.length > 0 && (
        <div className="max-w-[1200px] mx-auto w-full bg-neutral/5 p-6 rounded-2xl border border-foreground/10 flex flex-col gap-3">
          <span className="font-body uppercase tracking-widest text-neutral opacity-60 text-xs">
            Construindo sua Frase
          </span>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Card Principal (O que o usuário digitou) */}
            <div className="border border-green-400 rounded-2xl p-4 flex flex-col items-center justify-center w-32 bg-background shadow-figma text-center">
              <img
                src={`https://static.arasaac.org/pictograms/${resultados[0]._id}/${resultados[0]._id}_300.png`}
                alt={resultados[0].keywords?.[0]?.keyword ?? "card"}
                className="w-16 h-16 object-contain mb-2"
              />
              <span className="font-body text-xs font-bold uppercase text-emerald-600 block truncate w-full">
                {resultados[0].keywords?.[0]?.keyword}
              </span>
            </div>

            {/* Seta se houver sugestão */}
            {sugestoesIA.length > 0 && (
              <span className="text-xl text-neutral font-bold opacity-40">➔</span>
            )}

            {/* Sugestões geradas pela IA ao lado */}
            {sugestoesIA.map((pic) => (
              <div 
                key={pic._id} 
                className="border-2 border-dashed border-primary/40 rounded-2xl p-4 flex flex-col items-center justify-center w-32 bg-background hover:border-primary transition-all cursor-pointer shadow-sm text-center group"
                onClick={() => alert(`Clicou na sugestão: ${pic.keywords?.[0]?.keyword}`)}
              >
                <img
                  src={`https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`}
                  alt={pic.keywords?.[0]?.keyword}
                  className="w-16 h-16 object-contain mb-2 group-hover:scale-105 transition-transform"
                />
                <span className="font-body text-xs font-bold uppercase text-primary block truncate w-full">
                  {pic.keywords?.[0]?.keyword}
                </span>
                <span className="text-[9px] font-body text-neutral opacity-50 mt-1 block">IA</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* PICTOGRAMAS */}
      <div id="resultados">
        <PictogramasGrid q={q} resultados={resultados} categorias={categorias} />
      </div>

      <Contato />
      <Footer />
    </section>
  );
}
