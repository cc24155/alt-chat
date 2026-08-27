"use client";
import { useEffect, useState } from "react";

import NavigationBlue from "../components/NavigationBlue";
import HeroSection from "../components/HeroSection";
import Contato from "../components/Contato";
import Footer from "../components/Footer";
import { EstaLogado } from "../actions";
import { salvarFrase } from "./actions";

import { usePictogramas, PictogramasGrid } from "../components/PictogramaSection";
import NavBar from "../components/NavBar";
import { Pictograma } from "@/arasaac api/arasaac";

const sugestoesPadraoIA: Pictograma[] = [
  {
    _id: 2435,
    keywords: [{ keyword: "comer" }],
    origem: "arasaac",
  },
  {
    _id: 2555,
    keywords: [{ keyword: "brincar" }],
    origem: "arasaac",
  },
];

export default function FrasesPage() {
  const { q, categorias, resultados, loading } = usePictogramas([
    "Pessoas", "Animais", "Alimentos", "Ações", "Objetos"
  ]);

  const [logado, setLogado] = useState<boolean | null>(null); // null significa "carregando"
  const [sugestoesIA, setSugestoesIA] = useState<Pictograma[]>([]);
  const [fraseSelecionada, setFraseSelecionada] = useState<Pictograma[]>([]);
  const [pictogramaInicial, setPictogramaInicial] = useState<Pictograma | null>(null);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [salvandoFrase, setSalvandoFrase] = useState(false);
  const [erroAoSalvar, setErroAoSalvar] = useState<string | null>(null);

  async function buscarSugestoesIA(contexto: number[]) {
    const response = await fetch("http://localhost:8000/sugerir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contexto }),
    });

    const dados = await response.json();
    setSugestoesIA(Array.isArray(dados.sugestoes) ? dados.sugestoes : sugestoesPadraoIA);
  }

  function idsNumericos(pictogramas: Pictograma[]) {
    return pictogramas
      .map((pic) => Number(pic._id))
      .filter((id) => !isNaN(id));
  }

  async function selecionarSugestao(pic: Pictograma) {
    const proximaFrase = [...fraseSelecionada, pic];
    setFraseSelecionada(proximaFrase);

    const contexto = idsNumericos([
      ...(pictogramaInicial ? [pictogramaInicial] : []),
      ...proximaFrase,
    ]);

    if (contexto.length === 0) return;

    try {
      await buscarSugestoesIA(contexto);
    } catch (erro) {
      console.error("Erro ao chamar a IA:", erro);
      setSugestoesIA(sugestoesPadraoIA);
    }
  }

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
          setPictogramaInicial(cardCorreto);
          setFraseSelecionada([]);
          await buscarSugestoesIA([idNumerico]);
        } catch (erro) {
          console.error("Erro ao chamar a IA:", erro);
          setSugestoesIA(sugestoesPadraoIA);
        }
      } else {
        setPictogramaInicial(null);
        setSugestoesIA([]);
      }
    };

    obterSugestaoDinamica();
  }, [q, resultados, loading]);

  function exibirFraseMontada(frase: Pictograma[]) {
    if (frase.length === 0) return;
    setModalAberto(true);
  }

  async function finalizarFrase() {
    if (fraseMontada.length === 0 || salvandoFrase) return;

    setErroAoSalvar(null);
    setSalvandoFrase(true);

    try {
      const resultado = await salvarFrase(fraseMontada.map((pic) => Number(pic._id)));

      if (!resultado.success) {
        setErroAoSalvar(resultado.error ?? "N\u00e3o foi poss\u00edvel salvar a frase.");
        return;
      }

      exibirFraseMontada(fraseMontada);
    } catch (erro) {
      console.error("Erro ao finalizar frase:", erro);
      setErroAoSalvar("N\u00e3o foi poss\u00edvel salvar a frase. Tente novamente.");
    } finally {
      setSalvandoFrase(false);
    }
  }

  // quando terminar de carregar E tiver uma busca, rola até os resultados
  useEffect(() => {
    if (!loading && q) {
      document.getElementById("busca-frases")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, q]);

  if (loading)
    return <div className="text-foreground text-center py-20">Carregando...</div>;

  const qualBarraNavegacao = logado ? <NavigationBlue /> : <NavBar />;
  const pictogramaPrincipal = fraseSelecionada.length > 0
    ? fraseSelecionada[fraseSelecionada.length - 1]
    : pictogramaInicial;
  const fraseMontada = pictogramaInicial
    ? [pictogramaInicial, ...fraseSelecionada]
    : fraseSelecionada;

  //se é true, navigationblue, se não é, navbar


  return (
    <section className="w-full bg-background px-8 py-12 flex flex-col gap-8">
      {qualBarraNavegacao}

      {fraseMontada.length > 0 && (
        <div className="fixed right-4 bottom-4 z-[150] w-[min(92vw,420px)] bg-background border border-foreground/10 rounded-2xl shadow-figma p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="font-body uppercase tracking-widest text-neutral opacity-60 text-xs">
              Frase
            </span>
            <button
              type="button"
              onClick={() => {
                setPictogramaInicial(null);
                setFraseSelecionada([]);
                setSugestoesIA([]);
              }}
              className="font-body text-xs text-neutral hover:text-foreground transition-colors"
            >
              Limpar
            </button>
            <button
              type="button"
              onClick={finalizarFrase}
              disabled={salvandoFrase}
              className="font-body text-xs text-neutral hover:text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {salvandoFrase ? "Salvando..." : "Finalizar"}
            </button>
          </div>

          {erroAoSalvar && (
            <p role="alert" className="font-body text-xs text-secondary">
              {erroAoSalvar}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {fraseMontada.map((pic, index) => (
              <div
                key={`${pic._id}-${index}`}
                className="w-20 border border-foreground/10 rounded-xl p-2 bg-neutral/5 flex flex-col items-center text-center"
              >
                <img
                  src={`https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`}
                  alt={pic.keywords?.[0]?.keyword ?? "pictograma"}
                  loading="lazy"
                  className="w-12 h-12 object-contain"
                />
                <span className="font-body text-[10px] uppercase text-foreground truncate w-full">
                  {pic.keywords?.[0]?.keyword}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <HeroSection
        title="Frases"
        redirectTo="/Frases"
        showScroll={false} 
        textButton={"Pesquise pictogramas"} 
        routerPushButton={"/Biblioteca"}     
      />

      {/* SEÇÃO DA COSTRUÇÃO DE FRASES + PREDITIVO */}
      <div id="busca-frases" className="max-w-[1200px] mx-auto w-full flex flex-col gap-8 scroll-mt-24">
        {q && resultados && resultados.length > 0 && pictogramaPrincipal && (
          <div className="w-full bg-neutral/5 p-6 rounded-2xl border border-foreground/10 flex flex-col gap-3">
          <span className="font-body uppercase tracking-widest text-neutral opacity-60 text-xs">
            Construindo sua Frase
          </span>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Card Principal (O que o usuário digitou) */}
            <div className="border border-green-400 rounded-2xl p-4 flex flex-col items-center justify-center w-32 bg-background shadow-figma text-center">
              <img
                src={`https://static.arasaac.org/pictograms/${pictogramaPrincipal._id}/${pictogramaPrincipal._id}_300.png`}
                alt={pictogramaPrincipal.keywords?.[0]?.keyword ?? "card"}
                loading="lazy"
                className="w-16 h-16 object-contain mb-2"
              />
              <span className="font-body text-xs font-bold uppercase text-emerald-600 block truncate w-full">
                {pictogramaPrincipal.keywords?.[0]?.keyword}
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
                onClick={() => selecionarSugestao(pic)}
              >
                <img
                  src={`https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`}
                  alt={pic.keywords?.[0]?.keyword}
                  loading="lazy"
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
      </div>

      <Contato />
      <Footer />
      {/* POP-UP / MODAL EM DESTAQUE */}
      {modalAberto && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-6">
          <div className="bg-background border border-foreground/20 rounded-3xl p-8 max-w-4xl w-full flex flex-col items-center gap-6 shadow-2xl relative">
            
            <button
              type="button"
              onClick={() => setModalAberto(false)}
              className="absolute top-4 right-4 text-foreground/60 hover:text-foreground text-2xl font-bold p-2 transition-colors"
            >
              ✕
            </button>

            <span className="font-body uppercase tracking-widest text-primary text-sm font-bold">
              Frase Finalizada
            </span>

            {/* Lista dos pictogramas maiores */}
            <div className="flex flex-wrap justify-center gap-6 my-4 max-h-[60vh] overflow-y-auto p-2 w-full">
              {fraseMontada.map((pic, index) => (
                <div
                  key={`modal-${pic._id}-${index}`}
                  className="w-36 h-44 border border-foreground/15 rounded-2xl p-4 bg-neutral/10 flex flex-col items-center justify-between text-center shadow-md"
                >
                  <img
                    src={`https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`}
                    alt={pic.keywords?.[0]?.keyword ?? "pictograma"}
                    className="w-24 h-24 object-contain"
                  />
                  <span className="font-body text-xs font-bold uppercase text-foreground truncate w-full">
                    {pic.keywords?.[0]?.keyword}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setModalAberto(false)}
              className="px-6 py-2.5 rounded-xl bg-primary text-background font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
