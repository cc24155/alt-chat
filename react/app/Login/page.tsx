"use client";
import Button from "../components/Button";
import { autenticarUsuario } from "./actions";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";
import { JSX, useState } from "react";
import Footer from "../components/Footer";

// Componente de navegação (NavBar) permanece o mesmo
const NavBar = () => {
  const router = useRouter();
  const links = ["Biblioteca", "Sobre", "Contato"];
  return (
    <nav className="fixed top-4 left-0 w-full z-[100] px-4 flex items-center justify-between pointer-events-auto transition-all">
      <div className="pointer-events-auto">
        <Navigation/>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-8 bg-foreground/10 backdrop-blur-md px-6 py-2 rounded-full border border-foreground/5 pointer-events-auto">
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} className="text-foreground font-body text-xs sm:text-sm font-semibold hover:opacity-50 transition-all tracking-wider">
            {link}
          </a>
        ))}
      </div>
      <div className="flex gap-1 sm:gap-2 md:gap-3 pointer-events-auto">
        <Button text="Login" onClick={() => router.push("/Login")} className="text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 h-7 sm:h-8 md:h-9" />
        <Button text="Cadastro" onClick={() => router.push("/Cadastro")} className="text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 h-7 sm:h-8 md:h-9" />
      </div>
    </nav>
  );
};

const Form = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    alert("Tentativa de login");
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-8">
      {/* Título e Subtítulo */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-title text-5xl md:text-6xl text-foreground">LOGIN</h1>
      </div>

      {/* Formulário Estilizado */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral-400 font-body text-foreground"
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral-400 font-body text-foreground"
          />
          <div className="flex justify-end px-2">
            <button type="button" className="text-[10px] text-neutral-500 hover:underline">
              ESQUECEU A SENHA?
            </button>
          </div>
        </div>

        <Button
          text="ENTRAR"
          className="w-full py-4 mt-4 !rounded-full text-sm font-bold tracking-widest"
          onClick={handleSubmit}
        />
      </form>

      {/* Rodapé do Form */}
      <p className="font-body text-xs text-neutral-500">
        NÃO TEM UMA CONTA?{" "}
        <a href="/Cadastro" className="text-foreground font-bold hover:underline">
          CADASTRE-SE
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