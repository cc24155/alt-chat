"use client";
import { JSX, useState } from "react";

import { createUser } from "./actions";
import { useRouter } from "next/navigation";

import Button from "../components/Button";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const NavBar = () => {
  const router = useRouter();
  const links = ["Biblioteca", "Sobre", "Contato"];

  return (
    <nav className="fixed top-4 left-0 w-full z-100 px-4 flex items-center justify-between pointer-events-none transition-all">
      <div className="pointer-events-auto">
        <Navigation />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-8 bg-foreground/10 backdrop-blur-md px-6 py-2 rounded-full border border-foreground/5 pointer-events-auto">
        {links.map((link) => {

          let displayLink = link;
          let href = `/#${link.toLowerCase()}`;

          //a biblioteca tem uma estrutura de link diferente dos outros dois, por isso precisa verificar
          if (link === "Biblioteca") {
            displayLink = "Biblioteca";
            href = "/Biblioteca?q=";
          }

          return (
            <a
              key={link}
              href={href}
              className="text-foreground font-body font-semibold hover:opacity-50 transition-all tracking-wider"
            >
              {displayLink}
            </a>
          );
        })}
      </div>
      <div className="flex gap-1 sm:gap-2 md:gap-3 pointer-events-auto">
        <Button text="Login" onClick={() => router.push("/Login")} className="px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 h-7 sm:h-8 md:h-9" />
        <Button text="Cadastro" onClick={() => router.push("/Cadastro")} className="px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 h-7 sm:h-8 md:h-9" />
      </div>
    </nav>
  );
};

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

  const router = useRouter();

  const handleSubmit = async (e?: React.SubmitEvent) => {
    if (e) e.preventDefault();    //faz com que a página não recarregue quando apertar o botão cadastrar

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //o padrão de senha tem no minimo 8 letras, contendo maiusculas e minusculas, letras e caracteres especiais
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const notify = (msg: string, error = true) => {
      setMessage(msg);
      setIsError(error);
      setTimeout(() => setMessage(""), 2500);
    };

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
      const result = await createUser(name, email, user, password);
      if (result.success) {
        notify("Usuário cadastrado com sucesso! Redirecionando...", false);
        setTimeout(() => { router.push("/Login"); }, 2500);
      } else {
        notify("Erro ao cadastrar: " + result.error);
      }
    } catch (e) {
      console.error("Erro: ", e);
      notify("Erro inesperado no servidor.");
    }
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-8">
      {/* Título e Subtítulo */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-title text-foreground">CADASTRO</h1>
      </div>

      {/* Formulário Estilizado */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral text-foreground"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral text-foreground"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral text-foreground"
          />
        </div>
        {/* CAMPO SENHA 1 */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral text-foreground"
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

        {/* CAMPO SENHA 2 (CONFIRMAÇÃO) */}
        <div className="flex flex-col gap-1">
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral text-foreground"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 hover:opacity-60 transition-all flex items-center"
            >
              <img
                src={showConfirmPassword ? "/Eye.png" : "/EyeOff.png"}
                alt="Ver senha"
                className="w-5 h-5 dark:invert"
              />
            </button>
          </div>
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
          text="CADASTRAR"
          className="!text-[15px] w-full py-4 mt-4 !rounded-full font-bold tracking-widest"
          onClick={handleSubmit}
        />
      </form>

      {/* Rodapé do Form */}
      <p className="font-[10px] text-neutral">
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
