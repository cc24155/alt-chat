"use client";

import { ReactNode } from "react";

interface ButtonProps {
  text: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        /* Base: Mobile primeiro */
        px-[7px] py-[3px] rounded-full
        
        /* Desktop: Aumenta um pouco o respiro */
        sm:px-6 sm:py-3
        md:px-5 md:py-2

        font-body text-[10px] sm:text-xs font-medium
        
        bg-background
        flex items-center justify-center text-center
        text-foreground
        
        /* Sombras e Transições */
        shadow-figma
        transition-all duration-300

        /* Hovers */
        hover:bg-neutral
        hover:text-white

        cursor-pointer
        
        /* Permite que você controle a largura (ex: w-full ou w-64) por fora */
        ${className}
      `}
    >
      {text}
    </button>
  );
}
