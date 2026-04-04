"use client";
import Button from "../components/Button";

export default function ConfiguracoesPage() {
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