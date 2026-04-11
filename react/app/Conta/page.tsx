"use client";
import { useEffect, useState } from "react";
// Você pode remover a importação do Button aqui em cima se não for mais usar na página
import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";
import Link from "next/link";

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

export default function ContaPage() {
  const [resultados, setResultados] = useState<Pictograma[]>([]);
  const [busca, setBusca] = useState("");
  const [query, setQuery] = useState("pessoa");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPics = async () => {
      setLoading(true);
      const res = await fetch(
        `https://api.arasaac.org/api/pictograms/pt/search/${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResultados(data.slice(0, 4));
      setLoading(false);
    };

    fetchPics();
  }, [query]);

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault();
    if (busca.trim()) setQuery(busca.trim());
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <NavigationBlue />

      <main className="w-full py-[120px] px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          
          {/* Card do Usuário Dinâmico - relative e mb-24 para dar espaço pro avatar */}
          <div className="relative rounded-[32px] px-8 py-10 md:px-12 md:py-10 flex flex-col md:flex-row items-start bg-primary shadow-figma mb-20 md:mb-24 mt-8 md:mt-0">
            
            {/* Info do Usuário */}
            <div className="flex flex-col gap-1 w-full md:w-1/2 text-center md:text-left text-background relative z-10 pb-16 md:pb-0">
              <h1 className="font-subtitle text-[40px] leading-[90%] mb-2">
                usuário
              </h1>
              <p className="font-body text-[15px] opacity-90">
                biografia biografia biografia
              </p>
              <p className="font-body text-[15px] opacity-90">
                biografia biografia biografia
              </p>
              <p className="font-body text-[15px] opacity-90">
                biografia biografia biografia
              </p>
            </div>

            {/* Avatar na Borda Inferior Central (Estilo Figma) */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20">
                <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center bg-background shadow-figma border-4 border-transparent">
                    <Link href="/">
                        <img className="imagem-tema w-20 md:w-28 object-contain" alt="logotipo" />
                    </Link>
                </div>
            </div>

            <div className="absolute top-6 right-6 flex gap-3 z-50">
              <button 
                className="bg-background text-foreground font-body text-[14px] font-semibold px-6 py-2 rounded-full shadow-figma hover:shadow-figma-hover hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                Relatório
              </button>
              
              <button 
                className="bg-background text-foreground w-10 h-10 rounded-full flex items-center justify-center shadow-figma hover:shadow-figma-hover hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                <img src="/Settings.png" alt="Configurações" className="w-[18px] h-[18px] dark:invert opacity-70" />
              </button>
            </div>
          </div>

          {/* Seção Meus Pictogramas */}
          <div className="border border-foreground/10 rounded-3xl p-8 md:p-10 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              <h2 className="font-subtitle text-[40px] leading-[90%] text-foreground">
                Meus Pictogramas
              </h2>

              <form onSubmit={handleBusca} className="flex gap-3">
                <div className="relative flex items-center">
                  <img className="icon-search absolute left-4 w-4 h-4 opacity-50" alt="buscar" />
                  <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar pictograma..."
                    className="font-body text-[15px] border border-foreground/20 rounded-full pl-11 pr-4 py-2 bg-background text-foreground focus:outline-none focus:border-foreground/50 transition-all w-full md:w-64"
                  />
                </div>
                
                <button
                  type="submit"
                  className="font-body text-[15px] px-6 py-2 rounded-full bg-foreground text-background hover:opacity-80 transition-all font-medium"
                >
                  Buscar
                </button>
              </form>
            </div>

            {loading ? (
              <div className="text-center py-16 font-body text-[15px] text-neutral">Buscando pictogramas...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {resultados.map((pic) => (
                  <PicCard key={pic._id} pic={pic} />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}