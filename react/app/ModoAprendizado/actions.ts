"use server";
import { supabase } from "@/lib/supabase";

// export async function buscarDadosRelatorio() {
//   try {
//     // o auth.getUser() pega o user que logou no navegador q "fica salvo" no localStorage
//     const { data: { user }, error: userError } = await supabase.auth.getUser();

//     if (userError || !user) {
//       return { success: false, error: "Usuário não autenticado." };
//     }

//     const { data, error } = await supabase  //da tabela usuario pega o username, a biografia e o avatar_url
//       .from('relatorio') 
//       .select('acertos_modo_aprendizado, tempo_medio_mensagem, total_usos')
//       .eq('usuario_id', user.id)    //pega esses dados todos onde o campo id for igual ao id do user q acabou de logar
//       .single();            //ao invés de acessar os dados como uma array (result.dados[0].username) acessa tipo result.dados.username            

//     if (error) {
//       console.error("Erro ao buscar no banco:", error.message);
//       return { success: false, error: "Dados não encontrados." };
//     }

//     return { success: true, dados: data };

//   } 
//   catch (e) {
//     console.error("Erro: ", e);
//     return { success: false, error: "Erro inesperado." };
//   }
// }

// export async function inserirAcerto(acerto:number){
//     try{
//         var totalNumero = 0;
//         const { data: { user }, error: userError } = await supabase.auth.getUser();

//         if (userError || !user) {
//             return { success: false, error: "Usuário não autenticado." };
//         }

//         const {data: numeroAcerto, error: erroNumeroAcerto} = await supabase.from("relatorio").select("acertos_modo_aprendizado").eq("usuario_id", user).single()
//         if (numeroAcerto && !erroNumeroAcerto){
//             totalNumero = numeroAcerto?.acertos_modo_aprendizado;
//         } 
//         else{
//             return {success: false, error: erroNumeroAcerto };
//         }

//         const {data: dataAcerto, error: erorrAcerto} = await supabase
//         .from("relatorio")
//         .insert([
//           {
//             usuario_id: user,
//             acertos_modo_aprendizado: totalNumero + acerto
//           }
//         ]);
//         if (!erorrAcerto){
//             return { success:true };
//         }
//     }

//     catch(e){
//         console.error(e);
//         return { success: false, error: e };
//     }

// }

export async function registrarAcerto() {
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, error: "Usuário não autenticado." };
        }

        // 1. Tenta buscar o relatório desse usuário
        const { data: relatorioExistente, error: erroBusca } = await supabase
            .from("relatorio")
            .select("id, acertos_modo_aprendizado") 
            .eq("usuario_id", user.id)
            .single();

        // 2. Se o relatório ja existe, nós ATUALIZAMOS (somamos +1)
        if (relatorioExistente) {
            const totalAtualizado = (relatorioExistente.acertos_modo_aprendizado || 0) + 1;

            const { error: erroUpdate } = await supabase
                .from("relatorio")
                .update({ acertos_modo_aprendizado: totalAtualizado })
                .eq("id", relatorioExistente.id); // Atualiza a linha específica

            if (erroUpdate) return { success: false, error: erroUpdate };
            return { success: true, message: "Acerto somado!", total: totalAtualizado };
        } 
        
        // 3. Se NÃO EXISTE (erro PGRST116), é o primeiro acerto dele. Nós INSERIMOS.
        if (erroBusca && erroBusca.code === 'PGRST116') {
            const { error: erroInsert } = await supabase
                .from("relatorio")
                .insert([{ 
                    usuario_id: user.id, 
                    acertos_modo_aprendizado: 1, // Começa com 1 acerto
                    total_usos: 1
                }]);

            if (erroInsert) return { success: false, error: erroInsert };
            return { success: true, message: "Primeiro acerto registrado!", total: 1 };
        }

        return { success: false, error: erroBusca };

    } catch (e) {
        console.error(e);
        return { success: false, error: e };
    }
}

export async function quantosAcertosUsuario(){
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, error: "Usuário não autenticado." };
        }

        const { data: numeroAcerto, error: erroNumeroAcerto } = await supabase
            .from("relatorio")
            .select("acertos_modo_aprendizado")
            .eq("usuario_id", user.id)
            .maybeSingle();

        if (erroNumeroAcerto) {
            return { success: false, error: erroNumeroAcerto, data: 0 };
        }

        return {
            success: true,
            data: numeroAcerto?.acertos_modo_aprendizado ?? 0,
        };
    } catch(e){
        console.error(e);
        return { success: false, error: e };
    }
}