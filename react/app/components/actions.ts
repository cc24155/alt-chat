"use server";
import { supabase } from "@/lib/supabase";
import { Pictograma } from "@/arasaac api/arasaac";

type OrigemPictograma = "arasaac" | "usuario";

function colunaFavorito(id: number | string, origem?: OrigemPictograma) {
    if (origem === "usuario") return "usuario_pictograma_id";
    if (origem === "arasaac") return "pictograma_id";

    // Compatibilidade com chamadas antigas. O ideal é sempre passar origem.
    return typeof id === "string" && id.includes("-")
        ? "usuario_pictograma_id"
        : "pictograma_id";
}


export async function adicionarFavorito(id: number | string, origem?: OrigemPictograma) {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "Sessão expirada." };
        }

        const coluna = colunaFavorito(id, origem);
        const ehFav = await EFavorito(id, origem);
        if (ehFav?.success) return { success: true };

        const dadosParaInserir = {
            user_id: user.id,
            [coluna]: id
        };

        const { error } = await supabase
            .from("favorito")
            .insert([dadosParaInserir]);
        
        console.log("Insert resultado:", error ? error.message : "OK ✓");

        // Se não houver erro, deu certo (mesmo que data seja null)
        if (error)
            return { success: false, error: error.message };

        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function excluirFavoritos(id: number | string, origem?: OrigemPictograma) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user)
            return { success: false, error: "Sessão expirada." };

        const coluna = colunaFavorito(id, origem);

        const { error } = await supabase
            .from("favorito")
            .delete()
            .eq("user_id", user.id)
            .eq(coluna, id);

        if (error)
            return { success: false, error: error.message };

        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function EFavorito(id: number | string, origem?: OrigemPictograma) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, error: "Sessão expirada." };

        const coluna = colunaFavorito(id, origem);

        const { data, error } = await supabase
            .from("favorito")
            .select("id")
            .eq(coluna, id)
            .eq("user_id", user.id)
            .single();

        if (error) return { success: false, error: error.message };
        if (data) return { success: true, data: data };
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
            .select("pictograma_id, usuario_pictograma_id")
            .eq("user_id", user.id);

        const idsArasaac = new Set(
            favs?.map(f => String(f.pictograma_id)).filter(id => id !== "null") || []
        );
        const idsUsuario = new Set(
            favs?.map(f => String(f.usuario_pictograma_id)).filter(id => id !== "null") || []
        );

        // Retorna os pictogramas com o campo 'favorito' preenchido
        return pictogramas.map(pic => ({
            ...pic,
            favorito: pic.origem === "usuario"
                ? idsUsuario.has(String(pic._id))
                : idsArasaac.has(String(pic._id))
        }));
    } catch (e) {
        console.error("Erro ao marcar favoritos:", e);
        return pictogramas;
    }
}


export async function excluirPicProprio(id: number | string, origem?: OrigemPictograma) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user)
            return { success: false, error: "Sessão expirada." };

        const coluna = colunaFavorito(id, origem);

        const { error } = await supabase
            .from("usuario_pictograma")
            .delete()
            .eq("id", id)
            .eq("id_user", user.id);

        if (error)
            return { success: false, error: error.message };

        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
