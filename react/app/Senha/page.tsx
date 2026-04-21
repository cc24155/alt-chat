"use client";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { atualizarSenha } from "./actions"; // Ajuste o caminho se necessário
import Navigation from "../components/Navigation";
import Button from "../components/Button";

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

  const notify = (msg: string, error = true) => {
    setMessage(msg);
    setIsError(error);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (e?: React.SubmitEvent) => {
    if (e) e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (pass === "" || confirmPass === "") {
      notify("Preencha todos os campos.")
      return;
    }

    if (pass !== confirmPass) {
      return notify("As senhas não coincidem.");
    }

    if (!passwordRegex.test(pass)) {
      notify("Senha inválida! A senha deve conter:\n " +
        "- 8 letras;\n- Maiúsculas e minúsculas;\n- Números;\n- Caractere especial."
      );
      return;
    }

    try {
      const result = await atualizarSenha(pass);
      if (result.success) {
        notify("Senha atualizada! Redirecionando para o login...", false);
        setTimeout(() => router.push("/Login"), 2500);
      } else {
        notify("Erro ao atualizar: " + result.error);
      }
    } catch (e) {
      notify("Erro inesperado no servidor.");
      console.error("Deu erro: ", e)
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