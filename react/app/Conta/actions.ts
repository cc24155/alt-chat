"use server";
import { supabase } from "@/lib/supabase";
//import { buscarPictogramaPorId } from "@/arasaac api/arasaac";

// Interface para garantir que o TS não reclame dos pictogramas
export interface Pictograma {
  _id: number;
  keywords: { keyword: string }[];
  // adicione outros campos da API se necessário
}

export async function buscarDadosUsuario() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const { data: dataUser, error: errorUser } = await supabase
      .from("usuario")
      .select("username, biografia, avatar_url, email, nome")
      .eq("id", user.id)
      .single();

    if (errorUser) {
      return { success: false, error: "Dados do perfil não encontrados." };
    }

    const { data: dataFavs, error: errorPic } = await supabase
      .from("favorito")
      .select("pictograma_id")
      .eq("user_id", user.id);

    let pictogramasCompletos: unknown[] = [];

    if (!errorPic && dataFavs) {
      pictogramasCompletos = await Promise.all(
        dataFavs.map(async (fav) => {
          return await buscarPictogramaPorIdCerto(fav.pictograma_id);
        })
      );

      // Remove nulos (caso algum ID não exista na API)
      pictogramasCompletos = pictogramasCompletos.filter(p => p !== null);
    }

    return {
      success: true,
      dadosUser: dataUser,
      favoritos: pictogramasCompletos as Pictograma[]
    };

  } catch (e) {
    console.error("Erro geral:", e);
    return { success: false, error: "Erro inesperado." };
  }
}

export async function buscarPictogramaPorIdCerto(id: number): Promise<Pictograma | null> {
  try {
    const res = await fetch(`https://api.arasaac.org/api/pictograms/pt/${id}`);

    if (!res.ok)
      return null;

    return await res.json();
  }
  catch (error) {
    console.error(`Erro ao buscar ID ${id}:`, error);
    return null;
  }
}

export async function criarNovoPic(desc: string, img: File) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    // 1. Fazer o Upload da imagem para o Storage
    // Criamos um nome único para evitar conflitos (ex: timestamp + nome original)
    const fileName = `${Date.now()}-${img.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('pictogramas') //bucket do supabase (a gnt só aceita)
      .upload(`usuarios/${user.id}/${fileName}`, img);

    if (uploadError) {
      console.error("Erro no upload:", uploadError);
      return { success: false, error: "Falha ao enviar imagem." };
    }

    // 2. Pegar a URL pública da imagem recém enviada
    const { data: { publicUrl } } = supabase.storage
      .from('pictogramas')
      .getPublicUrl(`usuarios/${user.id}/${fileName}`);

    // 3. Inserir na tabela usuario_pictograma
    const { error: dbError } = await supabase
      .from('usuario_pictograma')
      .insert([
        {
          id_user: user.id,
          descricao: desc,
          url_imagem: publicUrl,
        }
      ]);

    if (dbError) {
      console.error("Erro ao salvar no banco:", dbError);
      return { success: false, error: "Erro ao registrar pictograma no banco." };
    }

    return { success: true, url: publicUrl };

  } catch (e) {
    console.error("Deu erro geral:", e);
    return { success: false, error: "Ocorreu um erro inesperado." };
  }
}

export async function pegarPicUser() {
  try{
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const { data: data, error: error } = await supabase
      .from("usuario_pictograma")
      .select("url_imagem, id")
      .eq("id_user", user.id)

    if (data && !error){
      return{ success: true, data: data };
    }
    return {success: false, data: null};
  }
  catch(e){
    console.error("Deu erro: ", e);
  }
}
