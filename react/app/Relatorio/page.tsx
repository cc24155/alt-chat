"use client";
import { useEffect, useState } from "react";
import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { EstaLogado } from "../actions";
import { buscarDadosRelatorio } from "./actions"; 
import Mensagem from "../components/Mensagem";

interface Relatorio {
  tempo_medio_mensagem?: number;
  acertos_modo_aprendizado?: number;
  total_usos?: number; 
}

export default function RelatorioPage() {
  const router = useRouter();
  
  const [acessoNegado, setAcessoNegado] = useState(false);
  const [usuario, setUsuario] = useState<Relatorio | null>(null);

  useEffect(() => {
    const carregarTudo = async () => {
      const resultLogin = await EstaLogado();
      if (!resultLogin?.success) {
        setAcessoNegado(true);
        return;
      }

      const resultRelatorio = await buscarDadosRelatorio();
      
      if (resultRelatorio.success && resultRelatorio.dados) {
        console.log(" Dados do servidor:", resultRelatorio.dados);
        setUsuario(resultRelatorio.dados as Relatorio);
      } else {
        console.error("Erro ao buscar no servidor:", resultRelatorio.error);
      }
    };

    carregarTudo();
  }, []);

  const META_ACERTOS = 3; 
  const totalAcertos = usuario?.acertos_modo_aprendizado || 0;
  const porcentagemAcertos = Math.min((totalAcertos / META_ACERTOS) * 100, 100);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {acessoNegado && (
        <Mensagem
          title="Acesso Negado"
          text="Você precisa estar logado para acessar sua conta."
          textButton="Ir para Login"
          onClick={() => router.push("/Login")}
          onClose={() => router.push("/")}
        />
      )}

      <NavigationBlue />

      <main className="flex-grow py-20 flex flex-col gap-12 justify-center">
        <span className="text-center font-title uppercase">Relatório</span>

        <div className="max-w-2xl mx-auto bg-background rounded-3xl p-10 shadow-figma gap-20">
          <div className="grid grid-cols-[1fr_200px] items-center gap-y-6 gap-x-4">
            
            <span className="font-body text-foreground/80 text-center">
              Pictogramas diários
            </span>
            <div className="w-full h-6 bg-foreground/10 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: "55%" }} 
              />
            </div>

            <span className="font-body text-foreground/80 text-center">
              Acertos no Modo Aprendizado
            </span>
            <div className="w-full h-6 bg-foreground/10 rounded-full overflow-hidden relative">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${porcentagemAcertos}%` }}
              />
              <span className="absolute inset-0 flex justify-center items-center text-xs font-bold text-background">
                {totalAcertos > 0 ? `${totalAcertos} acertos` : ""}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}