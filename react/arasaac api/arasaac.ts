
export interface Pictograma {
  _id: number;
  keywords: { keyword: string }[];
  url_imagem?: string;
  nome?: string;
  favorito?: boolean;
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
      return { nome, pictogramas: pics.slice(0, 6) }; // pega só os 6 primeiros de cada categoria
    })
  );
}

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
