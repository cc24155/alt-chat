"use server";
import { supabase } from "@/lib/supabase";
//import { error } from "console";

export async function EstaLogado() {
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, id: user?.id };
        }

        return { success: true };
    }
    catch (e) {
        console.error("Deu erro: ", e);
    }
}

export async function registrarUsoPictograma(pictogramaId: number | string, fraseId?: string) {
    const ehUsuario = typeof pictogramaId !== "number";

    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return { success: false, error: "Usuário não autenticado." };

        const agora = new Date();

        const { error } = await supabase
            .from("uso_pictograma")
            .insert([{
                usuario_id: user.id,
                pictograma_id: ehUsuario ? null : pictogramaId,
                usuario_pictograma_id: ehUsuario ? pictogramaId : null,
                frase_id: fraseId ?? null,
                hora_do_dia: agora.getHours(),
                dia_semana: agora.getDay()
            }]);

        if (error) return { success: false, error: error.message };
        return { success: true };

    } catch (e) {
        console.error(e);
        return { success: false, error: e };
    }
}