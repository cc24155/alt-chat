"use client";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { atualizarSenha } from "../Senha/actions"; // Ajuste o caminho se necessário
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
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const notify = (msg: string, error = true) => {
    setMessage(msg);
    setIsError(error);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (newPass.length < 6) {
      return notify("A senha deve ter no mínimo 6 caracteres.");
    }

    if (newPass !== confirmNewPass) {
      return notify("As senhas não coincidem.");
    }

    try {
      const result = await atualizarSenha(newPass);
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
        <h1 className="font-title text-foreground">NOVA SENHA</h1>
        <p className="font-body text-neutral text-sm">Crie uma senha forte e fácil de lembrar.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="Nova senha"
          className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
        />
        
        <input
          type="password"
          value={confirmNewPass}
          onChange={(e) => setConfirmNewPass(e.target.value)}
          placeholder="Confirme a nova senha"
          className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
        />

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