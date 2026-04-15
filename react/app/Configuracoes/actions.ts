"use server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function createUser(name:string, user:string, email:string, bio: string, password: string){
  try {
    const salt = await bcrypt.genSalt(10);   //gera dados aleatórios para serem misturados na criptografia em seguida
    const passwordHash = await bcrypt.hash(password, salt);

    const { data, error } = await supabase

    .from('usuario')
    .update([
      {
        nome: name,
        email: email,
        senha_hash: passwordHash
      }
    ])
    .select(); //faz com que o data não venha vazio

    if (error) {
      console.error("Erro ao alterar dados:", error.message);
      return { success: false, error: error.message };
    }

    if (data && data.length > 0) {
      return { success: true, data: data[0] };
    }
  
    return { success: true };
  }
  catch(e){
    console.error("Erro crítico ", e);
    return {success : false};
  }
}
