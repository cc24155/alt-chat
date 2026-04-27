"use server";
import { supabase } from "@/lib/supabase";
//import { error } from "console";

export async function EstaLogado() {
    try{
       const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            return { success: false };
        }

        return { success: true }; 
    }
    catch(e){
        console.error("Deu erro: ", e);
    }
}
