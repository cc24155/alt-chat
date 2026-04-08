"use client";

interface MensagemProps {
  text: string;
  onClick?: () => void;
}

export default function Mensagem({ text, onClick }: MensagemProps) {
  return (
    <button
      onClick={onClick}
      className=""
    >
      {text}
    </button>
  );
}
