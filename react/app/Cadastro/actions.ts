"use server";
import { supabase } from "@/lib/supabase";

export async function createUser(name:string, email:string, user: string, password: string){
  const { data, error } = await supabase
    .from('usuario')
    .insert([
      { 
        nome: name, 
        email: email, 
        senha_hash: password 
      }
    ])
    .select(); //faz com que o data não venha vazio

  if (error) {
    console.error("Erro ao cadastrar:", error.message);
    return { success: false, error: error.message };
  }

  if (data && data.length > 0) {
    return { success: true, data: data[0] };
  }
  
  return { success: true }; 
}
