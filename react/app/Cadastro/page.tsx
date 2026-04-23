"use client";
import { JSX, useState } from "react";

import { createUser } from "./actions";
import { useRouter } from "next/navigation";

import Button from "../components/Button";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";


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
      // setTimeout(() => setMessage(""), 2500);
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
      }
      else {
        notify("Erro ao cadastrar: " + result.error?.toString());
      }
    } catch (e) {
      console.error("Erro: ", e);
      notify("Erro inesperado no servidor.");
    }
  };

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
          text="CADASTRAR"
          className="!text-[15px] w-full py-4 mt-4 !rounded-full font-bold tracking-widest"
          onClick={handleSubmit}
        />
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
