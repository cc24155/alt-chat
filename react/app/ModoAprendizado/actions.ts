// "use server";
// import { supabase } from "@/lib/supabase";

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