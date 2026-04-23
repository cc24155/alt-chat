"use client";
import Button from "../components/Button";
import Footer from "../components/Footer";
import NavigationBlue from "../components/NavigationBlue";
import PicCard from "../components/PictogramaSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function ModoAprendizadoPage() {
  const router = useRouter();

  const picGato = { _id: 9879, keywords: [{ keyword: "Gato" }] };
  const picBurguer = { _id: 2419, keywords: [{ keyword: "Hambúrguer" }] };
  const picCasa = { _id: 8599, keywords: [{ keyword: "Guitarra Elétrica" }] };

  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [acertos, setAcertos] = useState<number[]>([]);
  const [popup, setPopup] = useState<{ visivel: boolean; mensagem: string; cor: string }>({
    visivel: false,
    mensagem: "",
    cor: ""
  });

  const verificarResposta = (idDaPalavraClicada: number) => {
    if (!selecionado) {
      mostrarPopup("Clique em uma imagem na esquerda primeiro!", "bg-secondary");
      return;
    }

    if (selecionado === idDaPalavraClicada) {
      mostrarPopup("Boa! Você acertou! 🎉", "bg-seconday");
      setAcertos([...acertos, idDaPalavraClicada]);
    } else {
      mostrarPopup("Ops! Não é essa. Tente de novo! 🤔", "bg-secondary");
    }

    setSelecionado(null);
  };

  const mostrarPopup = (mensagem: string, cor: string) => {
    setPopup({ visivel: true, mensagem, cor });
    setTimeout(() => {
      setPopup({ visivel: false, mensagem: "", cor: "" });
    }, 2500);
  };


  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <NavigationBlue />

      {/* POPUP RESPONSIVO */}
      {popup.visivel && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 w-[90%] md:w-auto px-6 py-4 rounded-xl shadow-2xl z-50 text-background font-bold text-center transition-all ${popup.cor}`}>
          {popup.mensagem}
        </div>
      )}

      <main className="flex-grow py-10 md:py-20 flex flex-col gap-8 md:gap-12 justify-center">
        <span className="text-center font-title uppercase text-2xl md:text-4xl">
          Modo Aprendizado
        </span>

        <div>
          <span className="text-center font-body text-foreground/80 mb-8 px-4 center block">
            Exercício 1: Clique na imagem e depois na palavra correta.
          </span>

          {/* CONTAINER RESPONSIVO: 
              Celular: px-4 (pouco padding), gap-6 (pouco espaço no meio)
              Tablet (md): px-10, gap-20
              PC (lg): px-40, gap-[200px] 
          */}
          <div className="flex flex-row justify-center w-full px-4 md:px-10 lg:px-40 gap-6 md:gap-20 lg:gap-[200px]">

            {/* GRUPO DA ESQUERDA (IMAGENS) */}
            <div className="flex flex-col gap-6 md:gap-8">
              <div
                onClick={() => !acertos.includes(picGato._id) && setSelecionado(picGato._id)}
                className={`w-[100px] md:w-[120px] cursor-pointer transition-all rounded-xl ${selecionado === picGato._id ? "ring-4 ring-primary" : ""} ${acertos.includes(picGato._id) ? "opacity-40 grayscale pointer-events-none" : ""}`}
              >
                <div className="pointer-events-none">
                  <PicCard pic={picGato} />
                </div>
              </div>

              <div
                onClick={() => !acertos.includes(picBurguer._id) && setSelecionado(picBurguer._id)}
                className={`w-[100px] md:w-[120px] cursor-pointer transition-all rounded-xl ${selecionado === picBurguer._id ? "ring-4 ring-primary" : ""} ${acertos.includes(picBurguer._id) ? "opacity-40 grayscale pointer-events-none" : ""}`}
              >
                <div className="pointer-events-none">
                  <PicCard pic={picBurguer} />
                </div>
              </div>

              <div
                onClick={() => !acertos.includes(picCasa._id) && setSelecionado(picCasa._id)}
                className={`w-[100px] md:w-[120px] cursor-pointer transition-all rounded-xl ${selecionado === picCasa._id ? "ring-4 ring-primary" : ""} ${acertos.includes(picCasa._id) ? "opacity-40 grayscale pointer-events-none" : ""}`}
              >
                <div className="pointer-events-none">
                  <PicCard pic={picCasa} />
                </div>
              </div>
            </div>

            {/* GRUPO DA DIREITA (PALAVRAS) */}
            <div className="flex flex-col gap-6 md:gap-8">
              <div
                onClick={() => !acertos.includes(picBurguer._id) && verificarResposta(picBurguer._id)}
                className={`w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all ${acertos.includes(picBurguer._id) ? "bg-seconday border-secondary text-secondary pointer-events-none" : "border-dashed border-neutral hover:border-primary"}`}
              >
                <span className="font-body font-bold text-center px-1">
                  {picBurguer.keywords[0].keyword}
                </span>
              </div>

              <div
                onClick={() => !acertos.includes(picCasa._id) && verificarResposta(picCasa._id)}
                className={`w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all ${acertos.includes(picCasa._id) ? "bg-secondary border-secondary text-secondary pointer-events-none" : "border-dashed border-neutral hover:border-primary"}`}
              >
                <span className="font-body font-bold text-center px-1">
                  {picCasa.keywords[0].keyword}
                </span>
              </div>

              <div
                onClick={() => !acertos.includes(picGato._id) && verificarResposta(picGato._id)}
                className={`w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all ${acertos.includes(picGato._id) ? "bg-secondary border-secondary text-secondary pointer-events-none" : "border-dashed border-neutral hover:border-primary"}`}
              >
                <span className="font-body font-bold text-center px-1">
                  {picGato.keywords[0].keyword}
                </span>
              </div>

            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
