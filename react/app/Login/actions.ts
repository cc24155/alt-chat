"use server"; 
import { supabase } from "@/lib/supabase";

export async function autenticarUsuario(email: string, password: string){
  try{
    //o signin with password decodifica a criptografia sozinho
    const {data, error} = await supabase.auth.signInWithPassword({email, password});
    if (error){
      console.error("Erro na busca: " + error.message);
      if (error.message == "Email not confirmed"){
        return {success: false, error: "Conta não ativada."};
      }
      if (error.message == "Invalid login credentials"){
        return { success: false, error: "Dado(s) inválido(s)"};
      }
      return { success: false, error: error.message};
    }
    
    return { success: true, user: data.user};

  }
  catch(e){
    console.error("Deu erro no servidor: ", e);
    return { success: false, error: "Erro inesperado ao criar conta." };
  }
}
