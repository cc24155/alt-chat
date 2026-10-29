// app/loading.tsx
"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)] transition-colors duration-300">
      <div className="relative flex flex-col items-center justify-center gap-6 p-4 text-center">
        
        {/* Anéis de carregamento animados */}
        <div className="relative flex items-center justify-center w-28 h-28">
          
          {/* Anel Externo Giratório */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--primary)] border-r-[var(--secondary)] animate-spin"
            style={{ animationDuration: '1.2s' }}
          />

          {/* Anel Interno em Sentido Contrário */}
          <div 
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-[var(--accent)] animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '0.9s' }}
          />

          {/* Logo Central */}
          <div className="relative w-12 h-12 animate-pulse flex items-center justify-center">
            <Image
              src="/Logo Claro.png"
              alt="ALT-CHAT Logo"
              width={48}
              height={48}
              priority
              className="object-contain theme-image"
            />
          </div>
        </div>

        {/* Informações Textuais */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="font-title text-2xl md:text-3xl tracking-wider text-[var(--foreground)]">
            ALT-CHAT
          </h1>

          <span className="font-subtitle text-lg md:text-xl text-[var(--primary)] opacity-90">
            Comunicação Alternativa
          </span>
        </div>

        {/* Texto auxiliar */}
        <p className="font-body text-xs text-[var(--neutral)] tracking-wide uppercase mt-1">
          Carregando...
        </p>

      </div>

    </div>
  );
}
