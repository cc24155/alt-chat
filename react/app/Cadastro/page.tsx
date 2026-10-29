"use client";
import { JSX, useState } from "react";

import { createUser } from "./actions";
import { useRouter } from "next/navigation";

import Button from "../components/Button";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Loading from "../loading";
import { supabase } from "@/lib/supabase";


const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const notify = (msg: string, error = true) => {
    setMessage(msg);
    setIsError(error);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });

      if (error) {
        notify("Não foi possível iniciar o cadastro com Google.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao iniciar cadastro com Google:", error);
      notify("Não foi possível iniciar o cadastro com Google.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e?: React.SubmitEvent) => {
    if (e) e.preventDefault();    //faz com que a página não recarregue quando apertar o botão cadastrar

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //o padrão de senha tem no minimo 8 letras, contendo maiusculas e minusculas, letras e caracteres especiais
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (name === "" || email === "" || user === "" || password === "" || confirmPassword === "") {
      notify("Preencha todos os campos.")
      return;
    }

    if (!emailRegex.test(email)) {
      notify("E-mail inválido.");
      return;
    }

    if (confirmPassword !== password) {
      notify("As senhas não coincidem.");
      return;
    }
    else if (!passwordRegex.test(password)) {
      notify("Senha inválida! A senha deve conter:\n " +
        "- 8 letras;\n- Maiúsculas e minúsculas;\n- Números;\n- Caractere especial."
      );
      return;
    }

    try {
      setLoading(true);
      const result = await createUser(name, email, user, password);
      if (result.success) {
        notify("Usuário cadastrado com sucesso! Redirecionando...", false);
        setTimeout(() => { router.push("/Login"); }, 2500);
      }
      else {
        notify("Erro ao cadastrar: " + result.error?.toString());
      }
    } catch (e) {
      console.error("Erro: ", e);
      notify("Erro inesperado no servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-8">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-title text-foreground">CADASTRO</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
        onChange={(e) => {
          if (message) setMessage(""); // Limpa a mensagem assim que ele começar a digitar
        }}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
        />
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
        />
        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-6 top-1/2 -translate-y-1/2 hover:opacity-60 transition-all flex items-center"
          >
            <img
              src={showPassword ? "/Eye.png" : "/EyeOff.png"}
              alt="Ver senha"
              className="w-5 h-5 icon-adaptive"
            />
          </button>
        </div>

        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-6 top-1/2 -translate-y-1/2 hover:opacity-60 transition-all flex items-center"
          >
            <img
              src={showConfirmPassword ? "/Eye.png" : "/EyeOff.png"}
              alt="Ver senha"
              className="w-5 h-5 icon-adaptive"
            />
          </button>
        </div>

        <div>
          {message && (
            <div className={`font-bold text-center p-3 rounded-full border ${isError
              ? "text-secondary border-secondary bg-secondary/10"
              : "text-primary border-primary bg-primary/10"
              } transition-all animate-bounce`}>
              {message.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          text="CADASTRAR"
          className="!text-[15px] w-full py-4 mt-4 !rounded-full font-bold tracking-widest"
        />

        <div className="flex items-center gap-4 text-neutral font-body text-sm">
          <span className="h-px flex-1 bg-foreground/20" />
          <span>ou</span>
          <span className="h-px flex-1 bg-foreground/20" />
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-full border border-foreground/30 py-4 font-body font-bold text-foreground transition-colors hover:bg-foreground/5 flex items-center justify-center gap-3"
        >
          <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.87 47 31.8 47 24.55Z" />
            <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.2a23.9 23.9 0 0 0 0 21.58l7.98-6.2Z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.88 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.2C6.51 42.62 14.62 48 24 48Z" />
          </svg>
          Cadastrar com Google
        </button>
      </form>

      <p className="font-body text-neutral">
        JÁ TEM UMA CONTA? FAÇA O {" "}
        <a href="/Login" className="text-foreground font-bold hover:underline">
          LOGIN
        </a>
      </p>
    </div>
  );
};

export const Box = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <NavBar />

      {/* Container Principal centralizado */}
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <Form />
      </main>

      <Footer />
    </div>
  );
};

export default Box;
