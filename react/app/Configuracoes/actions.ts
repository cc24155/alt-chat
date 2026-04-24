"use server";
import { supabase } from "@/lib/supabase";

export async function AtualizarDados(newUser: string, newName: string, newEmail: string, newBio: string, newPassword: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Sessão expirada ou inválida." };
    }

    // --- 1. ATUALIZAÇÃO DA AUTENTICAÇÃO (Auth) ---
    // Criamos um objeto vazio e só preenchemos o que foi digitado
    const authData: any = {};
    
    if (newEmail && newEmail.trim() !== "") authData.email = newEmail;
    if (newPassword && newPassword.trim() !== "") authData.password = newPassword;

    // Só chama o updateUser se houver algo para atualizar na Auth
    if (Object.keys(authData).length > 0) {
      const { error: authError } = await supabase.auth.updateUser(authData);
      if (authError) {
        return { success: false, error: "Erro na conta: " + authError.message };
      }
    }

    // --- 2. ATUALIZAÇÃO DA TABELA (Database) ---
    // Mesma lógica: criamos um objeto dinâmico para os dados do perfil
    const profileData: any = {};

    if (newUser && newUser.trim() !== "") profileData.username = newUser;
    if (newName && newName.trim() !== "") profileData.nome = newName;
    if (newBio && newBio.trim() !== "") profileData.biografia = newBio;

    // Só chama o update se houver algo para atualizar no Perfil
    if (Object.keys(profileData).length > 0) {
      const { error: dbError } = await supabase
        .from('usuario')
        .update(profileData)
        .eq('id', user.id);

      if (dbError) {
        console.error("Erro no banco:", dbError.message);
        return { success: false, error: "Erro ao salvar perfil: " + dbError.message };
      }
    }

    return { success: true, message: "Dados atualizados com sucesso!" };

  } catch (e) {
    console.error("Deu erro: ", e);
    return { success: false, error: "Erro inesperado no servidor." };
  }
}