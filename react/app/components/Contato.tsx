"use client";

interface ContatoProps {
}

export default function Contato({ }: ContatoProps) {
  return (
    <section
      id="contato"
      className="w-full bg-background py-[30px] px-8"
      aria-label="Contato"
    >
      <div className="max-w-[1200px] mx-auto gap-16 flex flex-col items-center text-center">
        {/* Divider */}
        <div className="w-full h-px bg-foreground" />
        
        <div className="flex flex-col gap-8">

          <h2 className="font-subtitle font-normal tracking-[-1.2px] leading-[90%] text-foreground">
            Fale conosco
          </h2>

          <p className="font-body font-normal tracking-[-0.075px] leading-[140%] text-neutral flex flex-col gap-1">
            {[
              { nome: "Mariana", email: "cc24140@g.unicamp.br" },
              { nome: "Rafaelly", email: "cc24153@g.unicamp.br" },
              { nome: "Samuel", email: "cc24155@g.unicamp.br" },
            ].map((contato) => (
              <a
                key={contato.email}
                href={`mailto:${contato.email}`}
                className="hover:text-foreground transition-colors"
              >
                <span className="font-bold">{contato.nome}:</span> {contato.email}
              </a>
            ))}
          </p>

        </div>
      </div>
    </section>
  );
}
