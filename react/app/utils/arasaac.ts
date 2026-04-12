import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export interface Pictograma {
  _id: number;
  keywords: { keyword: string }[];
}

export async function buscarPictogramas(q: string): Promise<Pictograma[]> {
  const res = await fetch(
    `https://api.arasaac.org/api/pictograms/pt/search/${encodeURIComponent(q)}`
  );
  return res.json();
}

export async function buscarCategorias(nomes: string[]) {
  return Promise.all(
    nomes.map(async (nome) => {
      const pics = await buscarPictogramas(nome);
      return { nome, pictogramas: pics.slice(0, 4) };
    })
  );
}

export function usePictogramas(nomes: string[]) {
  const searchParams = useSearchParams();   // pega os parâmetros da URL
  const q = searchParams.get("q");          // pega o valor do parâmetro "q"

  const [categorias, setCategorias] = useState<{ nome: string; pictogramas: Pictograma[] }[]>([]);
  const [resultados, setResultados] = useState<Pictograma[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      // modo busca -> se o parametro q existir
      if (q) {
        const data = await buscarPictogramas(q);
        setResultados(data);
        setCategorias([]);
      } 
      // modo geral
      else {
        const data = await buscarCategorias(nomes);
        setCategorias(data);
        setResultados([]);
      }
      setLoading(false);
    };
    fetch_();
  }, [q]);  // re-executa quando a busca muda

  return { q, categorias, resultados, loading };
}

// No arquivo arasaac.ts

export async function buscarPictogramaPorId(id: number): Promise<Pictograma | null> {
  try {
    const res = await fetch(`https://api.arasaac.org/api/pictograms/pt/${id}`);
    
    if (!res.ok) 
        return null; 

    return await res.json();
  } 
  catch (error) {
    console.error(`Erro ao buscar ID ${id}:`, error);
    return null;
  }
}

export async function buscarFavoritos(ids: number[]): Promise<Pictograma[]> {
  const promessas = ids.map(id => buscarPictogramaPorId(id));
  const resultados = await Promise.all(promessas);
  
  // Filtra apenas os que deram certo (remove os nulos)
  return resultados.filter((p): p is Pictograma => p !== null);
}
