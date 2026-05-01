"use server";
import { supabase } from "@/lib/supabase";
import { EstaLogado } from "../actions";

export async function adicionarFavorito(idPic: number) {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "Sessão expirada." };
        }

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

export async function name(picId:number) {
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