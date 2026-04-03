import { useEffect, useState } from "react";

interface NavigationProps {

}

export default function Navigation({ }: NavigationProps) {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}
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
          <div className="w-20 h-20 bg-preto rounded-sm flex items-center justify-center">
            <span>
              <img src="/Logotipo Claro.png" alt="Logotipo Claro.png" />
            </span>
          </div>
        </a>
      </div>
    </nav>
  );
}
