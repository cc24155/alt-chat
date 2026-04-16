"use server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function createUser(name: string, email: string, user: string, password: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {

        data: {
          full_name: name,
          username: user,
        },
      },
    });

    if (authError) {
      console.error("Erro no Auth: ", authError.message);
      return { success: false, error: authError.message };
    }

    if (authData.user) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const { error: dbError } = await supabase
        .from('usuario')
        .insert([
          { 
            id: authData.user.id, 
            nome: name, 
            email: email, 
            senha_hash: passwordHash,
            username: user,
            ative: false
          }
        ]);

      if (dbError) {
        console.error("Erro ao salvar no banco:", dbError.message);
        return { success: false, error: dbError.message };
      }
    }

    return { 
      success: true, 
      message: "Cadastro realizado! Verifique seu e-mail para ativar a conta." 
    }; 

  } catch (e) {
    console.error("Erro crítico:", e);
    return { success: false, error: "Erro inesperado ao criar conta." };
  }
}