"use client";

import { Pictograma } from "../utils/arasaac";

export default function PicCard({ pic }: { pic: Pictograma }) {
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

interface PictogramasGridProps {
  q?: string | null;
  resultados: Pictograma[];
  categorias: { nome: string; pictogramas: Pictograma[] }[];
  limite?: number; // <- opcional, limita quantos aparecem
}

export function PictogramasGrid({ q, resultados, categorias, limite }: PictogramasGridProps) {
  return (
    <div>
      {q ? (
        // Resultados da busca
        <>
          <span className="font-body text-neutral">
            Resultados para: <strong className="text-foreground">{q}</strong>
          </span>
          <div className="grid grid-cols-4 gap-4">
            {(limite ? resultados.slice(0, limite) : resultados).map((pic) => (
              <PicCard key={pic._id} pic={pic} />
            ))}
          </div>
        </>
      ) : categorias && categorias.length > 0 ? (
        // Todas as categorias
        categorias.map((cat) => (
          <div key={cat.nome} className="flex flex-col gap-4">
            <span className="font-body text-neutral tracking-widest uppercase">
              {cat.nome}
            </span>
            <div className="grid grid-cols-4 gap-4">
              {(limite ? cat.pictogramas.slice(0, limite) : cat.pictogramas).map((pic) => (
                <PicCard key={pic._id} pic={pic} />
              ))}
            </div>
          </div>
        ))
    ) : (
        // MODO FAVORITOS: Se não for busca nem categoria, renderiza apenas a grade simples
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(limite ? resultados.slice(0, limite) : resultados).map((pic) => (
            <PicCard key={pic._id} pic={pic} />
          ))}
        </div>
      )}
    </div>
  );
}
