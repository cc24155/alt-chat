"use client";
import Button from "../components/Button";
import { autenticarUsuario } from "./actions";

export default function CadastroPage() {
  async function handleLogin() {
    const result = await autenticarUsuario(new FormData());
    if (result.success) alert("Logado com sucesso!");
  }

  return (
    <div className="">
      <h1 className="">Sobre nós</h1>
      <p className="">
        Somos uma equipe que faz projetos incríveis com Next.js
      </p>
      <Button text="Voltar" onClick={() => alert("Voltando")} />
    </div>
  );
}