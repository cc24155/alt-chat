"use server";
import { supabase } from "@/lib/supabase";
//import { error } from "console";

export async function EstaLogado() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
        console.error("Deu erro: ", userError);
        return { success: false };
    }
    if (user) {
        return { success: true };
    }
}
