"use server";
import { supabase } from "@/lib/supabase";
import { EstaLogado } from "../actions";
import { Pictograma } from "@/arasaac api/arasaac";

export async function adicionarFavorito(idPic: number) {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "Sessão expirada." };
        }

        const ehFav = await EFavorito(idPic);       //se é favorito não pode favoritar dnv
        if (ehFav?.success) return { success: false, error: "Já é favorito." }

        const { error } = await supabase
            .from("favorito")
            .insert([{ pictograma_id: idPic, user_id: user.id }]);

        // Se não houver erro, deu certo (mesmo que data seja null)
        if (error) return { success: false, error: error.message };
        
        return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function excluirFavoritos(idPic: number) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, error: "Sessão expirada." };

        const { error } = await supabase
            .from("favorito")
            .delete()
            .eq("pictograma_id", idPic)
            .eq("user_id", user.id);

        if (error) return { success: false, error: error.message };
        
        return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function EFavorito(picId:number) {
    try{
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, error: "Sessão expirada." };

        const {data:data, error:error} = await supabase.from("favorito")
        .select("id")
        .eq("pictograma_id", picId)
        .eq("user_id", user.id)
        .single();

        if (error) return {success: false, error: error.message};
        if (data) return {success: true, data:data };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function marcarFavoritos(pictogramas: Pictograma[]): Promise<Pictograma[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return pictogramas; // Se não estiver logado, ninguém é favorito

    // Busca todos os IDs favoritos do usuário de uma vez só (Performance!)
    const { data: favs } = await supabase
      .from("favorito")
      .select("pictograma_id")  
      .eq("user_id", user.id);

    const idsFavoritos = new Set(favs?.map(f => String(f.pictograma_id)) || []);

    // Retorna os pictogramas com o campo 'favorito' preenchido
    return pictogramas.map(pic => ({
      ...pic,
      favorito: idsFavoritos.has(String(pic._id))
    }));
  } catch (e) {
    console.error("Erro ao marcar favoritos:", e);
    return pictogramas;
  }
}
