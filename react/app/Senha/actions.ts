"use server";
import { supabase } from "@/lib/supabase";

export async function recuperarSenha(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/Senha',
    });

    if (error) {
      console.error("Erro ao solicitar reset:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (e) {
    console.error("Erro crítico no reset:", e);
    return { success: false, error: "Erro inesperado ao enviar e-mail." };
  }
}


export async function atualizarSenha(newPass: string) {
  try {

    const { data: { session } } = await supabase.auth.getSession();
    console.log("Sessão encontrada:", !!session);

    if (!session) {
      return { success: false, error: "Sessão expirada ou inválida. Peça um novo e-mail." };
    }

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
