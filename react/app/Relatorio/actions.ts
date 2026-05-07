"use server";
import { supabase } from "@/lib/supabase";

export async function buscarDadosRelatorio() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const { data, error } = await supabase 
      .from('relatorio')
      .select('acertos_modo_aprendizado, total_usos')
      .eq('usuario_id', user.id) 
      .order('gerado_em', { ascending: false }) // Pega o relatório mais recente
      .limit(1)                                 // Evita o erro de múltiplas linhas
      .single();                                

if (error) {
    console.error("Erro no banco:", error.message);
    return { success: false, error: error.message }; 
}

    return { success: true, dados: data };

  } catch (e) {
    console.error("Erro: ", e);
    return { success: false, error: "Erro inesperado." };
  }
}