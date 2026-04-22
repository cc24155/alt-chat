"use client";
import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { atualizarSenha } from "./actions"; // Ajuste o caminho se necessário
import Navigation from "../components/Navigation";
import Button from "../components/Button";
import { supabase } from "@/lib/supabase";

const NavBar = () => {
  return (
    <nav className="fixed top-4 left-0 w-full z-10 px-4 flex items-center justify-between pointer-events-none transition-all">
      <div className="pointer-events-auto">
        <Navigation />
      </div>
    </nav>
  );
};

const Form = () => {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Quando a página carrega, o Supabase olha para o link (#access_token)
    // e ativa a sessão no navegador.
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Sessão de recuperação detectada no cliente!");
      }
    });
  }, []);

  const notify = (msg: string, error = true) => {
    setMessage(msg);
    setIsError(error);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (e?: React.FormEvent) => { // Use FormEvent para evitar erros de tipo
  if (e) e.preventDefault();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // 1. Validações básicas
  if (pass === "" || confirmPass === "") {
    notify("Preencha todos os campos.");
    return;
  }

  if (pass !== confirmPass) {
    return notify("As senhas não coincidem.");
  }

  if (!passwordRegex.test(pass)) {
    notify("Senha inválida! Verifique os requisitos.");
    return;
  }

  try {
    // 2. A MÁGICA ACONTECE AQUI:
    // Chamamos o supabase diretamente no componente (Client Side).
    // Ele vai ler o #access_token da URL automaticamente.
    const { data, error } = await supabase.auth.updateUser({
      password: pass
    });

    if (error) {
      // Se o Supabase retornar erro (ex: link expirado)
      console.error("Erro do Supabase:", error.message);
      notify("Erro: " + error.message);
      return;
    }

    // 3. Sucesso!
    if (data) {
      notify("Senha atualizada! Redirecionando...", false);
      
      // Espera um pouco para o usuário ler a mensagem e redireciona
      setTimeout(() => {
        router.push("/Login");
      }, 2500);
    }

  } catch (err) {
    notify("Erro inesperado ao processar.");
    console.error("Erro na submissão:", err);
  }
};

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-8">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-body text-foreground">CRIE UMA NOVA SENHA</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="relative w-full">
          <input
          type={showPassword ? "text" : "password"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Nova senha"
          className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
        />
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-6 top-1/2 -translate-y-1/2 hover:opacity-60 transition-all"
          >
            <img src={showPassword ? "/Eye.png" : "/EyeOff.png"} alt="Ver" className="w-5 h-5 dark:invert" />
          </button>
        </div>
        
        <div className="relative w-full">
          <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPass}
          onChange={(e) => setConfirmNewPass(e.target.value)}
          placeholder="Confirme a nova senha"
          className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
        />
        <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-6 top-1/2 -translate-y-1/2 hover:opacity-60 transition-all"
          >
            <img src={showConfirmPassword ? "/Eye.png" : "/EyeOff.png"} alt="Ver" className="w-5 h-5 dark:invert" />
          </button>
        </div>
        

        {message && (
          <div className={`font-bold text-center p-3 rounded-full border ${
            isError ? "text-secondary border-secondary bg-secondary/10" : "text-primary border-primary bg-primary/10"
          } transition-all animate-bounce`}>
            {message}
          </div>
        )}

        <Button 
          text="ATUALIZAR SENHA" 
          className="w-full py-4 mt-2 !rounded-full font-bold tracking-widest" 
          onClick={handleSubmit} 
        />
      </form>
    </div>
  );
};

export const ResetPage = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <Form />
      </main>
    </div>
  );
};

export default ResetPage;