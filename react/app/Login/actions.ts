"use server"; 
import { supabase } from "@/lib/supabase";

export async function autenticarUsuario(email: string, password: string){
  try{
    //o signin with password decodifica a criptografia sozinho
    const {data, error} = await supabase.auth.signInWithPassword({email, password});
    if (error){
      console.error("Erro na busca: " + error.message);
      return { success: false, error: "Dado(s) inválido(s)"};
    }
    if (!data.user.email_confirmed_at){
      console.log("conta não ativada")
      return {success: false, error: "Conta não ativada."};
      
    }
    console.log("logou")
    return { 
      success: true, 
      user: data.user 
    };

  }
  catch(e){
    console.error("Deu erro no servidor: ", e);
    return { success: false, error: "Erro inesperado ao criar conta." };
  }
}
