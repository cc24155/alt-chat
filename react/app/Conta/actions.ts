"use server";
import { buscarPictogramaPorId, Pictograma } from "@/arasaac api/arasaac";
import { supabase } from "@/lib/supabase";

//import { buscarPictogramaPorId } from "@/arasaac api/arasaac";

// Interface para garantir que o TS não reclame dos pictogramas


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
      favoritos: pictogramasCompletos as Pictograma[],
      userId: user.id
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
    const { error: uploadError } = await supabase.storage
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
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const { data: data, error: error } = await supabase
      .from("usuario_pictograma")
      .select("url_imagem, id, descricao")
      .eq("id_user", user.id)

    if (error || !data) {
      return { success: false, error: error?.message || "Erro ao buscar pictogramas" };
    }

    const formatados = data.map((p: { id: number | string; url_imagem: string; descricao: string | null; }) => ({
      _id: p.id,    // transformamos id em _id para o componente PicCard
      url_imagem: p.url_imagem,
      keywords: [{ keyword: p.descricao || "Meu Pictograma" }],
      favorito: false,
      origem: "usuario" as const
    }));

    return { success: true, data: formatados };
  }
  catch (e) {
    console.error("Deu erro: ", e);
  }
}

export async function pegarFavoritosUser() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const { data: favoritos, error: errorDb } = await supabase
      .from("favorito")
      .select("pictograma_id, usuario_pictograma_id")
      .eq("user_id", user.id);

    if (errorDb) throw errorDb;

    if (!favoritos || favoritos.length === 0) {
      return { success: true, data: [] };
    }

    // pega os ids recebidos da nossa api e vai atrás das imagens na api da arasaac
    const listaPromessas = favoritos.map(async (fav) => {
      // Se tem usuario_pictograma_id, busca do Supabase
      if (fav.usuario_pictograma_id) {
        const { data } = await supabase
          .from("usuario_pictograma")
          .select("id, url_imagem, descricao")
          .eq("id", fav.usuario_pictograma_id)
          .single();

        if (!data) return null;

        // Monta um objeto no formato Pictograma para ser compatível com o PicCard
        return {
          _id: data.id,
          url_imagem: data.url_imagem,
          keywords: [{ keyword: data.descricao ?? "pictograma próprio" }],
          favorito: true,
          origem: "usuario",
        } as Pictograma;
      }

      // Se tem pictograma_id, busca da Arasaac
      if (fav.pictograma_id) {
        const dados = await buscarPictogramaPorId(fav.pictograma_id);
        if (!dados) return null;
        return { ...dados, favorito: true, origem: "arasaac" } as Pictograma;
      }

      return null;
    });

    const resultadosArasaac = await Promise.all(listaPromessas);

    //filtra o que é nulo (caso o fetch da arasaac tenha falhado ou retornado !res.ok)
    const favoritosCompletos = resultadosArasaac
      .filter((item): item is Pictograma => item !== null)
      .filter((item, index, self) =>
        index === self.findIndex(p => String(p._id) === String(item._id))
      );

    if (favoritosCompletos)
      return { success: true, data: favoritosCompletos };

    else return { success: false }
  }
  //FAVOR NÃO TIRAR ESSES COMENTÁRIOS "ESTRANHOS", MARIANA MARIETTI. ESTOU DE OLHO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (e: any) {
    console.error("Erro ao pegar favoritos:", e);
    return { success: false, error: e.message || "Erro inesperado" };
  }
}


export async function trocarFotoPerfil(publicUrl: string) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Usuário não autenticado." };
    }
    const { error: dbError } = await supabase
      .from('usuario')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id);

    if (dbError) return { success: false, error: "Erro ao salvar no banco." };

    return { success: true, url: publicUrl };
  } catch (e) {
    return { success: false, error: "Erro inesperado." };
  }
}
