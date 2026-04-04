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
        <div className="flex flex-col gap-8">

          <h2 className="font-subtitle text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-foreground">
            Fale conosco
          </h2>

          <p className="font-body text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-neutral">
            cc24140@g.unicamp.br
            <br />
            cc24153@g.unicamp.br
            <br />
            cc24155@g.unicamp.br
          </p>
        </div>
      </div>
    </section>
  );
}
