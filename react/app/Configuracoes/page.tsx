"use client";
import { useState } from "react";

import Button from "../components/Button";
import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";

import { createUser } from "./actions";


const Config = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    if ((await createUser(name, email, user, password)).success){
      alert("Usuário cadastrado com sucesso!")
    }
  };

  
  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-8">
      {/* Título e Subtítulo */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-title text-foreground">CONFIGURAÇÕES</h1>
      </div>

      {/* Formulário Estilizado */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {/* Campo nome */}
        <div className="flex flex-col gap-1">
          <input 
            type="text" 
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
        </div>

        {/* Campo email */}
        <div>
          <input 
            type="text" 
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
        </div>

        {/* Campo usuario */}
        <div>
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-6 py-4 bg-transparent border border-foreground rounded-full outline-none focus:ring-1 focus:ring-foreground placeholder:text-neutral font-body text-foreground"
          />
        </div>

        {/* CAMPO SENHA */}
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
              className="w-5 h-5 dark:invert" 
            />
          </button>
        </div>

        {/* Campo tema */}

        {/* botoes */}
        <div className="flex gap-4 mt-4">
          <Button
            text="Sair"
            className="flex-1 py-4 !rounded-full font-bold tracking-widest"
            onClick={handleSubmit}
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
