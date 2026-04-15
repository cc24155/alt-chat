"use client";
import { useState, useEffect } from "react";

import Button from "../components/Button";
import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";

import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

// import { createUser } from "./actions";

const Config = () => {
  // estado para armazenar os dados do usuário
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [biografia, setBiografia] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const notify = (msg: string, error = true) => {
    setMessage(msg);
    setIsError(error);
    setTimeout(() => setMessage(""), 2500);
  };

  // carrega os dados do bd ao abrir a página
  useEffect(() => {
    // async function carregarDados() {
    //   try {
    //     const { data: { user }, error: authError } = await supabase.auth.getUser();
        
 
    //     const { data, error } = await supabase
    //       .from("usuario")
    //       .select("nome, username, email, biografia")
    //       .eq("id", user.id)
    //       .single();
 
    //     if (error)
    //       throw error;
 
    //     setName(data.nome ?? "");
    //     setUser(data.username ?? "");
    //     setEmail(data.email ?? "");
    //     setBiografia(data.biografia ?? "");
    //   }
    //   catch (error) {
    //     console.error("Erro ao buscar dados:", error);
    //     notify("Erro ao carregar perfil.");
    //   }
    // }
    // carregarDados();
  }, []);
 
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // atualiza os dados do usuário no bd
  const handleSubmit = async () => {
    // if (!name.trim() || !user.trim()) {
    //   notify("Nome e usuário são obrigatórios.");
    //   return;
    // }
 
    // try {
    //   const { data: { user } } = await supabase.auth.getUser();
 
    //   // atualiza perfil na tabela usuario
    //   const { error } = await supabase
    //     .from("usuario")
    //     .update({ name, username: user, biografia })
    //     .eq("id", user.id);
 
    //   if (error) throw error;
 
    //   // atualiza senha se preenchida
    //   if (password) {
    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    //     if (!passwordRegex.test(password)) {
    //       notify("Senha inválida! A senha deve conter:\n- 8 caracteres;\n- Maiúsculas e minúsculas;\n- Números;\n- Caractere especial.");
    //       return;
    //     }
    //     const { error: senhaError } = await supabase.auth.updateUser({ password: password });
    //     if (senhaError) throw senhaError;
    //   }
 
    //   notify("Dados salvos com sucesso!", false);
    // } catch (e: any) {
    //   console.error("Erro:", e);
    //   notify("Erro ao salvar: " + (e.message ?? "tente novamente."));
    // }
  };

  const setTema = (tema: string) => {
    const html = document.documentElement;
    // remove todos os temas antes
    html.classList.remove("light", "dark", "olivaceo-theme");
    // adiciona o novo
    if (tema)
      html.classList.add(tema);
    localStorage.setItem("tema-extra", tema);
  };

  
  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-8">
      {/* Título e Subtítulo */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-title text-foreground">CONFIGURAÇÕES</h1>
      </div>

      {/* Formulário Estilizado */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

        {/* Campo nome */}
        <div className="flex flex-row items-end gap-2">
          <span>
            Nome:
          </span>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-2 py-2 flex-1 w-full bg-transparent border-b border-foreground focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
        </div>

        {/* Campo usuario */}
        <div className="flex flex-row items-end gap-2">
          <span>
            Usuário:
          </span>
          <input
            type="text"
            placeholder="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="px-4 py-2 flex-1 w-full bg-transparent border-b border-foreground focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
        </div>

        {/* Campo email */}
        <div className="flex flex-row items-end gap-2">
          <span>
            E-mail:
          </span>
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 flex-1 w-full bg-transparent border-b border-foreground focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
        </div>

        {/* Campo biografia */}
        <div className="flex flex-row items-end gap-2">
          <span>
            Biografia:
          </span>
          <input
            type="text"
            placeholder="Biografia"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            className="px-4 py-2 flex-1 w-full bg-transparent border-b border-foreground focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
        </div>

        {/* CAMPO SENHA */}
        <div className="relative w-full flex flex-row items-end gap-2">
          <span>
            Senha:
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 flex-1 w-full bg-transparent border-b border-foreground focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-6 top-1/2 -translate-y-1/2 hover:opacity-60 transition-all flex items-center"
          >
            <img
              src={showPassword ? "/Eye.png" : "/EyeOff.png"}
              alt="Ver senha"
              className="w-5 h-5 dark:invert"
            />
          </button>
        </div>

        {/* Campo tema */}
        <span>
          Temas
        </span>
        <div className="relative w-full gap-4 flex">
          <Button
            text="Tema Oliváceo"
            onClick={() => setTema("olivaceo-theme")}
            className="!bg-[var(--azul-claro-olivaceo)] dark:!bg-[var(--azul-escuro-olivaceo)] hover:!bg-[var(--azul-escuro-olivaceo)] dark:hover:!bg-[var(--azul-claro-olivaceo)]"
          >
          </Button>
          <Button
            text="Tema Claro"
            onClick={() => setTema("light")}
            className="!text-[var(--preto)] !bg-[var(--off-white)] dark:!bg-[var(--off-white)] hover:!bg-neutral dark:hover:!bg-neutral"
          >
          </Button>
          <Button
            text="Tema Escuro"
            onClick={() => setTema("dark")}
            className="!text-[var(--off-white)] !bg-[var(--preto)] dark:!bg-[var(--preto)] hover:!bg-neutral dark:hover:!bg-neutral"
          >
          </Button>
        </div>

        {/* Mensagem de feedback */}
        {message && (
          <div className={`font-bold text-center p-3 rounded-full border ${
            isError
              ? "text-secondary border-secondary bg-secondary/10"
              : "text-primary border-primary bg-primary/10"
          } transition-all animate-bounce`}>
            {message.split("\n").map((line, index) => (
              <span key={index}>{line}<br /></span>
            ))}
          </div>
        )}
        
        {/* botoes */}
        <div className="flex gap-4 mt-4">
          <Button
            text="Sair"
            className="flex-1 py-4 !rounded-full font-bold tracking-widest"
            onClick={handleLogout}
          />
          <Button
            text="Salvar"
            className="flex-1 py-4 !rounded-full font-bold tracking-widest bg-info"
            onClick={handleSubmit}
          />
        </div>
        
      </form>
    </div>
  );
};

export default function ConfiguracoesPage() {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <NavigationBlue />

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <Config />
      </main>

      <Footer/>
    </div>
  );
}
