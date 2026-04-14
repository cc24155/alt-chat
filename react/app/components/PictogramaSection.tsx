"use client";
import { useState, useEffect } from "react";

import { buscarPictogramas, Pictograma } from "../../arasaac api/arasaac";
import Button from "./Button";


// piccard

export default function PicCard({ pic }: { pic: Pictograma }) {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div 
        onClick={() => setOpen(true)} 
        className="border border-foreground/10 rounded-2xl p-4 flex items-center justify-center aspect-square bg-neutral hover:border-foreground/30 hover:scale-[1.03] transition-all cursor-pointer shadow-figma">
        
        <img
          src={`https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`}
          alt={pic.keywords?.[0]?.keyword ?? "pictograma"}
          className="w-full h-full object-contain"
        />
      </div>

      {/* se estiver aberto*/}
      {open && 
        // chama a funcao (sobrepoe a tela e passa qual imagem deve abrir)
        <PicModal pic={pic} 
          // quando alquem clicar no botao de fechar, mude a variavel
          onClose={() => 
            setOpen(false)} />}
    </>
  );
}

// picgrid

interface PictogramasGridProps {
  q?: string | null;
  resultados: Pictograma[];
  categorias: { nome: string; pictogramas: Pictograma[] }[];
  limite?: number; // <- opcional, limita quantos aparecem
}

export function PictogramasGrid({ q, resultados, categorias, limite }: PictogramasGridProps) {
  const [categoriaAberta, setCategoriaAberta] = useState<string | null>(null);

  return (
    <>
      <div>
        {q ? (
          // Resultados da busca
          <>
            <span className="font-body text-neutral">
              Resultados para: <strong className="text-foreground">{q}</strong>
            </span>
            
            {resultados.length === 0 ? (
              <p className="font-body text-neutral py-8">Nenhum pictograma encontrado.</p>
            ) : (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {(limite ? resultados.slice(0, limite) : resultados).map((pic) => (
                  <PicCard key={pic._id} pic={pic} />
                ))}
              </div>
            )}
          </>
        ) : categorias && categorias.length > 0 ? (
          // Todas as categorias
          <div className="flex flex-col gap-12">
            {categorias.map((cat) => (
              <div key={cat.nome} className="max-w-[1200px] mx-auto w-full rounded-2xl p-6 flex items-center justify-center flex flex-col gap-4 bg-background shadow-figma">
                {/* categoria */}
                <button
                  onClick={() => setCategoriaAberta(cat.nome)}
                  className="font-body text-neutral tracking-widest uppercase hover:text-primary"
                  >
                    {cat.nome}
                </button>

                {/* pictogramas */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {(limite ? cat.pictogramas.slice(0, limite) : cat.pictogramas).map((pic, index) => (
                    <div key={pic._id} className={index >= 4 ? "hidden md:block" : ""}>
                      <PicCard pic={pic} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
      ) : (
          // MODO FAVORITOS: Se não for busca nem categoria, renderiza apenas a grade simples
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(limite ? resultados.slice(0, limite) : resultados).map((pic) => (
              <PicCard key={pic._id} pic={pic} />
            ))}
          </div>
        )}
      </div>

      {categoriaAberta && (
        <CategoriaModal nome={categoriaAberta} onClose={() => setCategoriaAberta(null)} />
      )}
    </>
  );
}

// picmodal

interface PicModalProps {
  pic: Pictograma;
  onClose: () => void;
}

function PicModal({ pic, onClose }: PicModalProps) {
  const imageUrl = `https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`;
  const keyword = pic.keywords?.[0]?.keyword ?? "sem nome";         // primeira keyword como titulo
  const allKeywords = pic.keywords?.map((k) => k.keyword) ?? [];   // cria uma lista com todas as outras
 
  // trava a rolagem da pagina que fica atras
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
 
  return (
    <div
      className="animate-fade-in fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Backdrop -> fundo por baixo */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-md"
        onClick={onClose}
      />
 
      {/* Card central */}
      <div
        className="animate-slide-up relative z-10 bg-background rounded-3xl shadow-figma w-full max-w-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}  // qnd vc clica dentro, ele nao fecha
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <span className="font-body uppercase tracking-[1.62px] text-neutral opacity-60 text-xs">
            Pictograma #{pic._id}
          </span>
          <Button
            text="✕"
            onClick={onClose}
            className="!w-9 h-9 rounded-full flex items-center justify-center border border-foreground/10 text-foreground hover:bg-foreground hover:text-background transition-all duration-200 cursor-pointer"
          >
          </Button>
        </div>
 
        {/* Imagem */}
        <div className="flex items-center justify-center bg-neutral/10 mx-8 rounded-2xl p-8 aspect-square max-h-72">
          <img
            src={imageUrl}
            alt={keyword}
            className="w-full h-full object-contain"
          />
        </div>
 
        {/* Info */}
        <div className="px-8 py-6 flex flex-col gap-6">
 
          {/* Nome principal */}
          <h2 className="font-subtitle capitalize tracking-[-1.2px] leading-[90%] text-foreground">
            {keyword}
          </h2>
 
          {/* Palavras-chave */}
          <div className="flex flex-col gap-2">
            <InfoBox label="Palavras-chave" value={
              <div className="flex flex-wrap gap-2">
                {allKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="font-body px-3 py-1 rounded-full border border-foreground/10 text-foreground capitalize"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            } />
          </div>

        </div>
      </div>

    </div>
  );
}
 
function InfoBox({ label, value }: 
  { label: string; 
    value: React.ReactNode; }
  ){

  return (
    <div className="flex flex-col gap-1 bg-neutral/10 rounded-xl px-4 py-3">
      <span className="font-body uppercase tracking-[1.62px] text-neutral opacity-60">
        {label}
      </span>
      <span className="font-body text-foreground font-medium">{value}</span>
    </div>
  );
}

// categoriamodal

interface CategoriaModalProps {
  nome: string;
  onClose: () => void;
}

export function CategoriaModal({ nome, onClose }: CategoriaModalProps) {
  const [pics, setPics] = useState<Pictograma[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarPictogramas(nome).then((data) => {
      setPics(data);
      setLoading(false);
    });
  }, [nome]);

  // trava a rolagem da pagina que fica atras
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);


  return (
    <div className="animate-fade-in fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-md" onClick={onClose} />

      <div
        className="animate-slide-up relative z-10 bg-background rounded-3xl shadow-figma w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 pt-8 pb-4 shrink-0">
          <h2 className="font-subtitle capitalize tracking-[-1.2px] leading-[90%] text-foreground">
            {nome}
          </h2>
          <Button 
            onClick={onClose} 
            text="✕"
            className="!w-9 h-9 rounded-full flex items-center justify-center border border-foreground/10 text-foreground hover:bg-foreground hover:text-background transition-all duration-200 cursor-pointer">
          </Button>
        </div>

        <div className="overflow-y-auto px-8 pb-8">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <span className="font-body text-neutral">Carregando...</span>
            </div>
          ) : (
            <>
              <span className="font-body text-neutral mb-4 block">
                {pics.length} pictogramas encontrados
              </span>
              <div className="grid grid-cols-4 gap-4">
                {pics.map((pic) => (
                  <PicCard key={pic._id} pic={pic} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
