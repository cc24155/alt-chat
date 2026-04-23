"use server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function AtualizarDados(newUser:string, newName: string, newEmail:string, newBio:string, newPasword:string) {
  const {data, error} = await supabase.auth.updateUser({user: newUser})

  //precisa descobrir o id do usuario logado e usar p atualizar as coisas
}