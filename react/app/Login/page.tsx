"use client";
import { JSX, useState } from "react";
import { autenticarUsuario } from "./actions";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { recuperarSenha } from "../Senha/actions";

const NavBar = () => {
  const router = useRouter();
  const links = ["Biblioteca", "Sobre", "Contato"];
  
  return (
    <nav className="fixed top-4 left-0 w-full z-10 px-4 flex items-center justify-between pointer-events-none transition-all">
      <div className="pointer-events-auto">
        <Navigation />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-8 bg-foreground/10 backdrop-blur-md px-6 py-2 rounded-full border border-foreground/5 pointer-events-auto">
        {links.map((link) => {
          let displayLink = link;
          let href = `/#${link.toLowerCase()}`;
          if (link === "Biblioteca") {
            displayLink = "Biblioteca";
            href = "/Biblioteca?q=";    
          }

          return (
            <a key={link} href={href} className="text-foreground font-body font-semibold hover:opacity-50 transition-all tracking-wider">
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
  const [email, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const router = useRouter();

  const notify = (msg: string, error = true) => {
    setMessage(msg);
    setIsError(error);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleSubmit = async (e?: React.SubmitEvent) => {
    if (e) e.preventDefault();
    try {
      const result = await autenticarUsuario(email, password);
      if (result.success) {
        notify("Login feito com sucesso! Redirecionando...", false);
        setTimeout(() => { router.push("/Conta"); }, 2500);
      } else {
        notify("Erro: " + result.error);
      }
    } catch (e) {
      notify("Erro inesperado no servidor.");
    }
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-8">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-title text-foreground">LOGIN</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setUser(e.target.value)}
          className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
        />

        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral text-foreground"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-6 top-1/2 -translate-y-1/2 hover:opacity-60 transition-all"
          >
            <img src={showConfirmPassword ? "/Eye.png" : "/EyeOff.png"} alt="Ver" className="w-5 h-5 dark:invert" />
          </button>
        </div>

        <div className="flex justify-end px-2">
          <button 
            type="button" 
            onClick={() => setIsModalOpen(true)}
            className="text-body text-neutral cursor-pointer hover:underline"
          >
            ESQUECEU A SENHA?
          </button>
        </div>

        {message && (
          <div className={`font-bold text-center p-3 rounded-full border ${isError ? "text-secondary border-secondary bg-secondary/10" : "text-primary border-primary bg-primary/10"} transition-all animate-bounce`}>
            {message}
          </div>
        )}

        <Button text="ENTRAR" className="w-full py-4 mt-4 !rounded-full font-bold tracking-widest" onClick={handleSubmit} />
      </form>

      {/* --- MODAL DE ESQUECI A SENHA --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-background border border-foreground/20 p-8 rounded-[2rem] shadow-2xl flex flex-col gap-6">
            <div className="text-center">
              <h2 className="font-title text-2xl text-foreground">RECUPERAR SENHA</h2>
              <p className="text-neutral font-body mt-2">Enviaremos um link para o seu e-mail.</p>
            </div>
            
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none font-body text-foreground"
            />

            <div className="flex flex-col gap-3">
              <Button 
                text="ENVIAR LINK" 
                className="w-full py-4 !rounded-full font-bold" 
                onClick={async () => {
                  console.log("Recuperar para:", forgotEmail);
                  setIsModalOpen(false);
                  const rec = await recuperarSenha(forgotEmail);
                  if (rec.success){
                    notify("Link enviado!", false);
                  }
                  else{
                    notify("Erro: " + rec.error);
                  }
                }} 
              />
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-neutral hover:text-foreground cursor-pointer font-bold transition-all"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="font-body text-neutral">
        NÃO TEM UMA CONTA?{" "}
        <a href="/Cadastro" className="text-foreground font-bold hover:underline">CADASTRE-SE</a>
      </p>
    </div>
  );
};

export const Box = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <Form />
      </main>
      <Footer />
    </div>
  );
};

export default Box;