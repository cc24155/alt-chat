"use client";
import Link from "next/link";

interface NavigationProps {

}

export default function Navigation({ }: NavigationProps) {
  return (
    <nav
      className={`fixed top-0 left-0 transition-all duration-300`}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="max-w-[1440px] mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#biblioteca"
          className="flex items-center gap-2 no-underline"
          aria-label="Ir para o início"
        >
          <div className="w-20 h-20 bg-transparent rounded-sm flex items-center justify-center">
            <img className="imagem-tema w-full h-full object-contain" alt="Logotipo.png" />
          </div>
        </a>
      </div>
    </nav>
  );
}
