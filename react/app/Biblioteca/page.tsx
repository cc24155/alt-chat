"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import NavigationBlue from "../components/NavigationBlue";
import HeroSection from "../components/HeroSection";
import Contato from "../components/Contato";
import Footer from "../components/Footer";

interface Pictograma {
  _id: number;
  keywords: { keyword: string }[];
}

function PicCard({ pic }: { pic: Pictograma }) {
  return (
    <div className="border border-foreground/10 rounded-2xl p-4 flex items-center justify-center aspect-square bg-neutral hover:border-foreground/30 transition-all cursor-pointer">
      <img
        src={`https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`}
        alt={pic.keywords?.[0]?.keyword ?? "pictograma"}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default function BibliotecaPage() {
  const searchParams = useSearchParams(); // pega os parâmetros da URL
  const q = searchParams.get("q");        // pega o valor do parâmetro "q"

  const [categorias, setCategorias] = useState<{
    nome: string;
    pictogramas: Pictograma[] }[]>([]);
  const [resultados, setResultados] = useState<Pictograma[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);

      // Modo busca, se parametro "q" existir
      if (q) {
        const res = await fetch(
          `https://api.arasaac.org/api/pictograms/pt/search/${encodeURIComponent(q)}`
        );
        const data = await res.json();
        setResultados(data);
        setCategorias([]);
      }
      // Modo geral — categorias
      else {
        const nomes = ["Pessoas", "Animais", "Alimentos", "Ações", "Objetos"];
        const results = await Promise.all(
          nomes.map(async (nome) => {
            const res = await fetch(
              `https://api.arasaac.org/api/pictograms/pt/search/${encodeURIComponent(nome)}`
            );
            const data = await res.json();
            return { nome, pictogramas: data.slice(0, 4) };
          })
        );
        setCategorias(results);
        setResultados([]);
      }

      setLoading(false);
    };

    fetch_();
  }, [q]); // re-executa quando a busca muda

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

      <div className="">
        {/* PICTOGRAMAS */}
        {q ? (
          // Resultados da busca
          <>
            <span className="font-body text-sm text-neutral">
              Resultados para: <strong className="text-foreground">{q}</strong>
            </span>
            <div className="grid grid-cols-4 gap-4">
              {resultados.map((pic) => (
                <PicCard key={pic._id} pic={pic} />
              ))}
            </div>
          </>
        ) : (
          // Todas as categorias
          categorias.map((cat) => (
            <div key={cat.nome} className="flex flex-col gap-4">
              <span className="font-body text-xs text-neutral tracking-widest uppercase">
                {cat.nome}
              </span>
              <div className="grid grid-cols-4 gap-4">
                {cat.pictogramas.map((pic) => (
                  <PicCard key={pic._id} pic={pic} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      
      <Contato/>
      <Footer/>
    </section>
  );
}
