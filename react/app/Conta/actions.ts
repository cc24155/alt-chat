"use server";
import { supabase } from "@/lib/supabase";
//import { buscarPictogramaPorId } from "@/arasaac api/arasaac";

// Interface para garantir que o TS não reclame dos pictogramas
export interface Pictograma {
  _id: number;
  keywords: { keyword: string }[];
  // adicione outros campos da API se necessário
}

export async function buscarDadosUsuario() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const { data: dataUser, error: errorUser } = await supabase
      .from("usuario")
      .select("username, biografia, avatar_url, email, nome")
      .eq("id", user.id)
      .single();

    if (errorUser) {
      return { success: false, error: "Dados do perfil não encontrados." };
    }

    const { data: dataFavs, error: errorPic } = await supabase
      .from("favorito")
      .select("pictograma_id")
      .eq("user_id", user.id);

    let pictogramasCompletos: unknown[] = [];

    if (!errorPic && dataFavs) {
      pictogramasCompletos = await Promise.all(
        dataFavs.map(async (fav) => {
          return await buscarPictogramaPorIdCerto(fav.pictograma_id);
        })
      );
      
      // Remove nulos (caso algum ID não exista na API)
      pictogramasCompletos = pictogramasCompletos.filter(p => p !== null);
    }

    return { 
      success: true, 
      dadosUser: dataUser, 
      favoritos: pictogramasCompletos as Pictograma[]
    };

  } catch (e) {
    console.error("Erro geral:", e);
    return { success: false, error: "Erro inesperado." };
  }
}

export async function buscarPictogramaPorIdCerto(id: number): Promise<Pictograma | null> {
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