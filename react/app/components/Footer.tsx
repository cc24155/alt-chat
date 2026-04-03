interface FooterProps {
}

export default function Footer({ }: FooterProps) {
  return (
    <footer className="w-full bg-preto border-t border-[rgba(255,255,255,0.06)] py-12 px-8" role="contentinfo">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-[280px]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-off-white rounded-sm flex items-center justify-center">
                <span className="text-preto text-xs font-bold [font-family:'Victor_Mono',Helvetica]">
                  A
                </span>
              </div>
              <span className="[font-family:'Victor_Mono',Helvetica] text-[18px] font-normal tracking-[-0.5px] text-off-white">
                anima.
              </span>
            </div>
            <p className="[font-family:'DM_Sans',Helvetica] text-[14px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(248,244,235,0.45)]">
              Estúdio de design e tecnologia criando produtos digitais que
              transformam negócios.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Empresa",
                links: ["Sobre", "Processo", "Carreiras", "Blog"],
              },
              {
                title: "Serviços",
                links: [
                  "Design de Produto",
                  "Desenvolvimento",
                  "Branding",
                  "Estratégia",
                ],
              },
              {
                title: "Contato",
                links: ["oi@anima.studio", "Instagram", "LinkedIn", "Behance"],
              },
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <span className="[font-family:'Abel',Helvetica] text-[12px] font-normal tracking-[1.62px] text-[rgba(248,244,235,0.4)] uppercase">
                  {col.title}
                </span>
                <ul className="flex flex-col gap-2 list-none m-0 p-0">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="[font-family:'DM_Sans',Helvetica] text-[14px] font-normal tracking-[-0.075px] text-[rgba(248,244,235,0.55)] no-underline hover:text-off-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgba(255,255,255,0.06)]" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="[font-family:'DM_Sans',Helvetica] text-[13px] font-normal tracking-[-0.075px] text-[rgba(248,244,235,0.35)]">
            © 2024 Anima Studio. Todos os direitos reservados.
          </span>
          <div className="flex items-center gap-6">
            {["Privacidade", "Termos", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="[font-family:'DM_Sans',Helvetica] text-[13px] font-normal tracking-[-0.075px] text-[rgba(248,244,235,0.35)] no-underline hover:text-off-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
