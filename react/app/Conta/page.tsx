"use client";
import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import Button from "../components/Button";
import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";
import Link from "next/link";

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

export default function ContaPage() {
  const [resultados, setResultados] = useState<Pictograma[]>([]);
  const [busca, setBusca] = useState("");
  const [query, setQuery] = useState("pessoa"); // busca inicial padrão
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
    <>
      <NavigationBlue />

      <div className="container mx-auto px-4 py-16 flex flex-col gap-6">
        {/* Card do usuário */}
        <div
          className="relative rounded-2xl px-8 py-6 flex items-center gap-8"
          style={{ backgroundColor: "#5ba8a0" }}
        >
          <div className="flex flex-col gap-1 flex-1">
            <h1 className="text-white text-2xl font-semibold mb-2">usuário</h1>
            <p className="text-white text-sm leading-relaxed">biografia biografia biografia</p>
            <p className="text-white text-sm leading-relaxed">biografia biografia biografia</p>
            <p className="text-white text-sm leading-relaxed">biografia biografia biografia</p>
          </div>

          <div className="flex-shrink-0">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-sm text-center"
              style={{ backgroundColor: "#f5f0e8", color: "#333" }}
            >
              <Link href="/">
                <img className="imagem-tema w-20" alt="logotipo"/>
              </Link>
            </div>
          </div>

          <div className="flex-1" />

          <div className="absolute top-4 right-4 flex gap-2">
            <Button text="Relatório" onClick={() => {}} />
            <Button text={<Settings size={18} />} onClick={() => {}} />
          </div>
        </div>

        {/* Seção Meus Pictogramas */}
        <div className="border border-foreground/10 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Meus Pictogramas</span>

            {/* Busca */}
            <form onSubmit={handleBusca} className="flex gap-2">
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar pictograma..."
                className="border border-foreground/20 rounded-lg px-3 py-1 text-sm bg-background text-foreground focus:outline-none focus:border-foreground/50"
              />
              <button
                type="submit"
                className="text-sm px-3 py-1 rounded-lg border border-foreground/20 hover:border-foreground/50 transition-all"
              >
                Buscar
              </button>
            </form>
          </div>

          {loading ? (
            <div className="text-center py-8 text-sm text-foreground/50">Carregando...</div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {resultados.map((pic) => (
                <PicCard key={pic._id} pic={pic} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}