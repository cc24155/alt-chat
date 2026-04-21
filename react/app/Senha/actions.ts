"use server"; 
import { supabase } from "@/lib/supabase";

export async function atualizarSenha(newPass: string) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPass
    });

    if (error) {
      console.error("Erro ao atualizar senha:", error.message);
      return { success: false, error: error.message };
    }

    if (data) {
      return { success: true, message: "Senha atualizada com sucesso!" };
    }

    return { success: false, error: "Não foi possível atualizar a senha." };

  } catch (e) {
    console.error("Deu erro crítico no servidor: ", e);
    return { success: false, error: "Erro inesperado no servidor." };
  }
}