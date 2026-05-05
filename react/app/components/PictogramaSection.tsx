"use client";
import { useState, useEffect } from "react";

import { buscarPictogramas, buscarCategorias, Pictograma } from "../../arasaac api/arasaac";
import { useSearchParams } from "next/navigation";

import Button from "./Button";
import { adicionarFavorito, excluirFavoritos, marcarFavoritos, excluirPicProprio } from "./actions";


export function usePictogramas(nomes: string[]) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [categorias, setCategorias] = useState<{ nome: string; pictogramas: Pictograma[] }[]>([]);
  const [resultados, setResultados] = useState<Pictograma[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      if (q) {
        const rawPics = await buscarPictogramas(q);
        // Transforma a lista básica em uma lista com "status"
        const picsComStatus = await marcarFavoritos(rawPics);
        setResultados(picsComStatus);
        setCategorias([])
      } else {
        const cats = await buscarCategorias(nomes);
        // Para as categorias, você teria que percorrer cada uma:
        const catsComStatus = await Promise.all(cats.map(async (cat) => ({
          ...cat,
          pictogramas: await marcarFavoritos(cat.pictogramas)
        })));
        setCategorias(catsComStatus);
      }
      setLoading(false);
    };
    fetch_();
  }, [q]);

  return { q, categorias, resultados, loading };
}

// piccard

export default function PicCard({ pic, onUpdate }: { pic: Pictograma, onUpdate?: () => void }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const imagemExibida = pic.url_imagem
    ? pic.url_imagem // Imagem do seu Supabase
    : `https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`; // Imagem da Arasaac

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="border border-foreground/10 rounded-2xl p-4 flex items-center justify-center aspect-square bg-neutral hover:border-foreground/30 hover:scale-[1.03] transition-all cursor-pointer shadow-figma">

        <img
          src={imagemExibida}
          alt={pic.keywords?.[0]?.keyword ?? "pictograma"}
          className="w-full h-full object-contain"
        />
      </div>

      {/* se estiver aberto*/}
      {open &&
        // chama a funcao (sobrepoe a tela e passa qual imagem deve abrir)
        <PicModal
          pic={pic}
          isFavorited={pic.favorito}
          onClose={handleClose} // quando alquem clicar no botao de fechar, mude a variavel
          onUpdate={onUpdate}
        />}
    </>
  );
}

// picgrid

interface PictogramasGridProps {
  q?: string | null;
  resultados: Pictograma[];
  categorias: { nome: string; pictogramas: Pictograma[] }[];
  limite?: number; // <- opcional, limita quantos aparecem
  onUpdate?: () => void;
}

export function PictogramasGrid({ q, resultados, categorias, limite, onUpdate }: PictogramasGridProps) {
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
                  <PicCard key={pic._id} pic={pic} onUpdate={onUpdate} />
                ))}
              </div>
            )}
          </>
        ) : categorias && categorias.length > 0 ? (
          // Todas as categorias
          <div className="flex flex-col gap-12">
            {categorias.map((cat) => (  //tem que implementar algo para pegar a descrição(nome) se o pictograma for criado pelo user aqui
              <div key={cat.nome} className="max-w-[1200px] mx-auto w-full rounded-2xl p-6 flex items-center justify-center flex flex-col gap-4 bg-background shadow-figma transition-all cursor-pointer">
                {/* categoria */}
                <div
                  className="w-full flex flex-col items-center gap-4"
                >
                  <span
                    onClick={() => setCategoriaAberta(cat.nome)}
                    className="font-body text-neutral tracking-widest uppercase hover:text-primary  hover:scale-[1.09] text-center">
                    {cat.nome}
                  </span>

                  {/* pictogramas */}
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                    {(limite ? cat.pictogramas.slice(0, limite) : cat.pictogramas).map((pic, index) => (
                      <div key={pic._id} className={index >= 4 ? "hidden md:block" : ""}>
                        <PicCard pic={pic} onUpdate={onUpdate} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // MODO FAVORITOS: Se não for busca nem categoria, renderiza apenas a grade simples
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(limite ? resultados.slice(0, limite) : resultados).map((pic) => (
              <PicCard key={pic._id} pic={pic} onUpdate={onUpdate} />
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
  onUpdate?: () => void;
  isFavorited?: boolean;
}

function PicModal({ pic, onClose, isFavorited, onUpdate }: PicModalProps) {
  const keyword = pic.keywords?.[0]?.keyword ?? "sem nome";         // primeira keyword como titulo
  const allKeywords = pic.keywords?.map((k) => k.keyword) ?? [];   // cria uma lista com todas as outras
  const origem = pic.origem ?? (pic.url_imagem ? "usuario" : "arasaac");

  const [favoritado, setFavoritado] = useState(Boolean(isFavorited));

  useEffect(() => {
    setFavoritado(Boolean(isFavorited));
  }, [isFavorited]);

  //precisa ver se tá favorito com o marcar favorito

  // trava a rolagem da pagina que fica atras
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    async function verificarFavorito() {
      if (!pic._id) return;
      const { EFavorito } = await import("./actions");
      const res = await EFavorito(pic._id, origem);
      if (res?.success) {
        setFavoritado(true);
      } else if (!isFavorited) {
        setFavoritado(false);
      }
    }
    verificarFavorito();
  }, [pic._id, origem, isFavorited]); // roda toda vez que um modal abre

  async function handleToggleFavorite() {
    const estadoAnterior = favoritado;
    const novoEstado = !favoritado;

    setFavoritado(novoEstado);

    try {
      const res = novoEstado
        ? await adicionarFavorito(pic._id, origem)
        : await excluirFavoritos(pic._id, origem);

      if (!res.success) {
        setFavoritado(estadoAnterior);
        throw new Error("Não deu certo");
      }
      if (!novoEstado && window.location.pathname.includes('Conta')) {
        onClose();
        if (onUpdate) onUpdate();
      } else {
        if (onUpdate) onUpdate();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro na operação:", error);
      // Reverte o estado visual se a operação falhar
      setFavoritado(estadoAnterior);
      alert("Não foi possível salvar seu favorito. Tente novamente. " + error.message);
    }
  }

  async function handleDelete() {
    try {
      const res = await excluirPicProprio(pic._id);
      if (res.success) {
        onClose();
        if (onUpdate) onUpdate();
      } else {
        alert("Erro ao excluir: " + res.error);
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  const imagemExibida = pic.url_imagem
    ? pic.url_imagem
    : `https://static.arasaac.org/pictograms/${pic._id}/${pic._id}_300.png`;
  

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
            src={imagemExibida}
            alt={keyword}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="px-8 py-6 flex flex-col gap-6">

          <div className="w-full flex items-center justify-between gap-4">
            {/* Nome principal */}
            <h2 className="font-subtitle capitalize tracking-[-1.2px] leading-[90%] text-foreground">
              {keyword}
            </h2>

            <div className="flex items-center gap-2">
              {/* Coracao */}
              <button
                onClick={() => handleToggleFavorite()}
                className="flex items-center justify-center hover:scale-110 transition-all"
              >
                <img
                  src={favoritado ? "/Heart-filled.png" : "/Heart-fav.png"}   //se deu certo, heart-filled, senãon heart-fav
                  alt="Favoritar"
                  className={`w-6 h-6 transition-all icon-adaptive ${favoritado ? "shadow-figma" : ""
                    }`}
                />
              </button>

              {/* Lixeira */}
              {origem === "usuario" && (
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center hover:scale-110 transition-all p-2 rounded-full"
                  title="Excluir pictograma"
                >
                  <img
                    src="/Trash.png" // Certifique-se de ter esse ícone na pasta public
                    alt="Excluir"
                    className="w-6 h-6 icon-adaptive
                  hover:content-[url('/Trash-open.png')]"
                  />
                </button>
              )}
            </div>
          </div>
            
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
  {
    label: string;
    value: React.ReactNode;
  }
) {

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
      marcarFavoritos(data).then((picsComStatus) => {
        setPics(picsComStatus);
        setLoading(false);
      });
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
