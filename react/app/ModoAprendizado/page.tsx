"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Mensagem from "../components/Mensagem";
import NavigationBlue from "../components/NavigationBlue";
import PicCard from "../components/PictogramaSection";
import { EstaLogado } from "../actions";
import { quantosAcertosUsuario, registrarAcerto } from "./actions";
import { buscarPictogramas } from "../../arasaac api/arasaac";

type PictogramaExercicio = {
  _id: number;
  keywords: { keyword: string }[];
};

type Nivel = {
  titulo: string;
  instrucoes: string;
  palavras: string[];
};

const NIVEIS: Nivel[] = [
  {
    titulo: "Palavras do dia a dia",
    instrucoes: "Selecione uma imagem e encontre a palavra correspondente.",
    palavras: ["Gato", "Hambúrguer", "Guitarra"],
  },
  {
    titulo: "Pessoas e lugares",
    instrucoes: "Associe cada pictograma ao seu significado.",
    palavras: ["Pessoa", "Casa", "Escola"],
  },
  {
    titulo: "Ações",
    instrucoes: "Observe as imagens e escolha a ação certa.",
    palavras: ["Comer", "Dormir", "Ler"],
  },
  {
    titulo: "Natureza",
    instrucoes: "Complete esta rodada conectando imagem e palavra.",
    palavras: ["Sol", "Árvore", "Chuva"],
  },
  {
    titulo: "Desafio final",
    instrucoes: "Você chegou ao último nível. Boa concentração!",
    palavras: ["Amigo", "Feliz", "Brincar"],
  },
];

function embaralhar<T>(itens: T[]) {
  return [...itens].sort(() => Math.random() - 0.5);
}

function embaralharPalavras(pictogramas: PictogramaExercicio[]) {
  const palavrasEmbaralhadas = embaralhar(pictogramas);
  const ficouAlinhado = palavrasEmbaralhadas.every(
    (palavra, indice) => palavra._id === pictogramas[indice]?._id,
  );

  if (ficouAlinhado && palavrasEmbaralhadas.length > 1) {
    const primeiraPalavra = palavrasEmbaralhadas.shift();
    if (primeiraPalavra) palavrasEmbaralhadas.push(primeiraPalavra);
  }

  return palavrasEmbaralhadas;
}

export default function ModoAprendizadoPage() {
  const router = useRouter();
  const [acessoNegado, setAcessoNegado] = useState(false);
  const [nivelAtual, setNivelAtual] = useState(0);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [acertos, setAcertos] = useState<number[]>([]);
  const [totalAcertos, setTotalAcertos] = useState(0);
  const [pictogramas, setPictogramas] = useState<PictogramaExercicio[]>([]);
  const [palavras, setPalavras] = useState<PictogramaExercicio[]>([]);
  const [popup, setPopup] = useState({ visivel: false, mensagem: "", sucesso: false });

  const nivel = NIVEIS[nivelAtual];
  const nivelConcluido = pictogramas.length > 0 && acertos.length === pictogramas.length;

  useEffect(() => {
    const carregarPictogramas = async () => {
      const resultados = await Promise.all(nivel.palavras.map(async (palavra) => {
        const encontrados = await buscarPictogramas(palavra);
        const pictograma = encontrados[0];
        return pictograma ? { ...pictograma, _id: Number(pictograma._id), keywords: [{ keyword: palavra }] } : null;
      }));

      const pictogramasCarregados = resultados.filter((p): p is PictogramaExercicio => p !== null);
      setPictogramas(pictogramasCarregados);
      setPalavras(embaralharPalavras(pictogramasCarregados));
      setAcertos([]);
      setSelecionado(null);
    };

    void carregarPictogramas();
  }, [nivelAtual, nivel.palavras]);

  useEffect(() => {
    const carregarProgresso = async () => {
      const resultLogin = await EstaLogado();
      if (!resultLogin?.success) {
        setAcessoNegado(true);
        return;
      }

      const resultado = await quantosAcertosUsuario();
      if (resultado.success) setTotalAcertos(resultado.data ?? 0);
    };
    carregarProgresso();
  }, []);

  const mostrarPopup = (mensagem: string, sucesso = false) => {
    setPopup({ visivel: true, mensagem, sucesso });
    window.setTimeout(() => setPopup({ visivel: false, mensagem: "", sucesso: false }), 2200);
  };

  const registrarResposta = async () => {
    try {
      const resultado = await registrarAcerto();
      if (resultado.success && resultado.total !== undefined) {
        setTotalAcertos(resultado.total);
      }
    } catch (error) {
      console.error("Erro ao registrar acerto:", error);
    }
  };

  const verificarResposta = (idDaPalavraClicada: number) => {
    if (selecionado === null) {
      mostrarPopup("Selecione uma imagem primeiro.");
      return;
    }

    if (selecionado === idDaPalavraClicada) {
      setAcertos((atuais) => [...atuais, idDaPalavraClicada]);
      setTotalAcertos((total) => total + 1);
      void registrarResposta();
      mostrarPopup("Boa! Associação correta.", true);
    } else {
      mostrarPopup("Ainda não. Tente outra palavra.");
    }
    setSelecionado(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {acessoNegado && (
        <Mensagem
          title="Acesso Negado"
          text="Você precisa estar logado para acessar sua conta."
          textButton="Ir para Login"
          onClick={() => router.push("/Login")}
          onClose={() => router.push("/")}
        />
      )}

      <NavigationBlue />

      {popup.visivel && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 w-[90%] md:w-auto px-6 py-4 rounded-xl shadow-2xl z-50 font-body font-bold text-center border bg-background ${popup.sucesso ? "text-primary border-primary" : "text-secondary border-secondary"}`} role="status">
          {popup.mensagem}
        </div>
      )}

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 pt-28 pb-16 flex flex-col gap-8">
        <header className="text-center flex flex-col gap-4">
          <h1 className="font-title text-3xl md:text-5xl uppercase">Modo Aprendizado</h1>
          <p className="font-body text-foreground/70">Treine associações, avance no seu ritmo e acompanhe sua evolução.</p>
        </header>

        <section className="bg-background border border-foreground/10 rounded-3xl shadow-figma p-5 md:p-8 flex flex-col gap-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-body text-primary font-bold uppercase tracking-widest">Nível {nivelAtual + 1} de {NIVEIS.length}</p>
              <h2 className="font-subtitle text-2xl text-foreground mt-2">{nivel.titulo}</h2>
              <p className="font-body text-foreground/70 mt-2">{nivel.instrucoes}</p>
            </div>
            <p className="font-body text-foreground/70">{totalAcertos} acertos registrados</p>
          </div>

          <div className="h-2 rounded-full bg-foreground/10 overflow-hidden" aria-label={`Progresso: ${nivelAtual + 1} de ${NIVEIS.length} níveis`}>
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${((nivelAtual + (nivelConcluido ? 1 : 0)) / NIVEIS.length) * 100}%` }} />
          </div>

          {!nivelConcluido ? (
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5 md:gap-16 max-w-2xl mx-auto w-full">
              <div className="flex flex-col gap-5">
                {pictogramas.map((pic) => {
                  const resolvido = acertos.includes(pic._id);
                  return (
                    <button key={pic._id} type="button" disabled={resolvido} onClick={() => setSelecionado(pic._id)} className={`aspect-square rounded-2xl text-left transition-all ${selecionado === pic._id ? "ring-4 ring-primary" : ""} ${resolvido ? "opacity-35 grayscale" : "hover:-translate-y-1"}`} aria-label={`Selecionar imagem de ${pic.keywords[0].keyword}`}>
                      <span className="pointer-events-none block"><PicCard pic={pic} /></span>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col gap-5">
                {palavras.map((pic) => {
                  const resolvido = acertos.includes(pic._id);
                  return (
                    <button key={pic._id} type="button" disabled={resolvido} onClick={() => verificarResposta(pic._id)} className={`aspect-square flex items-center justify-center rounded-2xl border-2 px-3 font-body font-bold text-center transition-all ${resolvido ? "border-primary bg-primary/10 text-primary" : "border-dashed border-neutral hover:border-primary hover:text-primary"}`}>
                      {pic.keywords[0].keyword}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center gap-5 py-8">
              <p className="font-subtitle text-2xl text-primary">Nível concluído</p>
              <p className="font-body text-foreground/70">Todas as associações estão corretas.</p>
              <button type="button" onClick={() => setNivelAtual((atual) => atual < NIVEIS.length - 1 ? atual + 1 : 0)} className="rounded-full bg-primary text-background px-6 py-3 font-body font-bold hover:opacity-85 transition-opacity">
                {nivelAtual < NIVEIS.length - 1 ? "Próximo nível" : "Refazer percurso"}
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
