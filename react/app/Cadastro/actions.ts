"use server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function createUser(name: string, email: string, user: string, password: string) {
  try {
<<<<<<< Updated upstream
=======
    //autenticação por email
>>>>>>> Stashed changes
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
<<<<<<< Updated upstream

        data: {
          full_name: name,
          username: user,
        },
      },
    });

    if (authError) {
      console.error("Erro no Auth: ", authError.message);
      return { success: false, error: authError.message };
    }

    if (authData.user) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const { error: dbError } = await supabase
        .from('usuario')
        .insert([
          { 
            id: authData.user.id, 
=======
        data: {
          full_name: name,
          username: user,
        },
      },
    });

    if (authError) {
      console.error("Erro no Auth:", authError.message);
      return { success: false, error: authError.message };
    }

    //se teve o authData (resposta que deu certo a criação no bd interno do supabase)
    if (authData && authData.user) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const { data, error: dbError } = await supabase
        .from('usuario')
        .insert([
          { 
            id: authData.user.id,     //pega o id que está na tabela do supabase e o usa na de usuários
>>>>>>> Stashed changes
            nome: name, 
            email: email, 
            senha_hash: passwordHash,
            username: user,
<<<<<<< Updated upstream
            ative: false
          }
        ]);

      if (dbError) {
        console.error("Erro ao salvar no banco:", dbError.message);
        return { success: false, error: dbError.message };
      }
    }

    return { 
      success: true, 
      message: "Cadastro realizado! Verifique seu e-mail para ativar a conta." 
    }; 

  } catch (e) {
    console.error("Erro crítico:", e);
    return { success: false, error: "Erro inesperado ao criar conta." };
=======
            ative: false 
          }
        ])
        .select();      //o select faz com que tenha uma resposta no data

      if (dbError) {
        console.error("Erro ao inserir na tabela usuario:", dbError.message);
        return { success: false, error: dbError.message };
      }

      return { 
        success: true, 
        message: "Usuário cadastrado! Verifique seu e-mail.",
        data: data ? data[0] : null 
      };
    }

    return { success: false, error: "Falha ao obter dados de autenticação." };

  } catch (e) {
    console.error("Erro crítico:", e);
    return { success: false, error: "Erro interno no servidor." };
>>>>>>> Stashed changes
  }
}