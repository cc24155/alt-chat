/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
          href="/"
          className="flex items-center gap-2 no-underline"
          aria-label="Ir para o início"
        >
          <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-transparent rounded-sm flex items-center justify-center">
            <img className="theme-image w-full h-full object-contain" alt="Logotipo.png" />
          </div>
        </a>
      </div>
    </nav>
  );
}
