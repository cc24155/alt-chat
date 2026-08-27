import { supabase } from "@/lib/supabase";

export async function salvarFrase(ids: number[]) {
  if (!ids || ids.length === 0 || ids.some((id) => !Number.isFinite(id))) {
    return { success: false, error: "Nenhum pictograma enviado." };
  }

  try {
    const { error } = await supabase
      .from("frase_pictograma")
      .insert({ lista_pictograma: JSON.stringify(ids) });

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error("Erro ao salvar frase:", error);
    return { success: false, error: error.message };
  }
}
