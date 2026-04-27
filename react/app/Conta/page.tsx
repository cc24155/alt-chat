"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";
import { buscarDadosUsuario } from "./actions";

import { Pictograma } from "../Conta/actions";
import { PictogramasGrid } from "../components/PictogramaSection";
import Button from "../components/Button";
import Mensagem from "../components/Mensagem";
import { EstaLogado } from "../actions";

interface Usuario {
  username: string;
  biografia: string;
  avatar_url?: string;
}

export default function ContaPage() {
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<Pictograma[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const carregarTudo = async () => {
      try {
        setLoading(true);
        const res = await buscarDadosUsuario();

        if (res.success) {
          // 1. Define os dados do perfil
          if (res.dadosUser) {
            setUsuario(res.dadosUser);
          }
          // 2. Define os favoritos que a Action buscou na API Arasaac
          if (res.favoritos) {
            setFavoritos(res.favoritos);
          }
        } else {
          // Se não houver sucesso (ex: deslogado), manda para o login
          router.push("/");
        }
      } catch (err) {
        console.error("Erro ao carregar dados da conta:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarTudo();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-foreground font-body animate-pulse">Carregando seu perfil...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <NavigationBlue />

      <main className="w-full py-[120px] px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          
          {/* Card do Usuário Dinâmico */}
          <div className="relative rounded-[32px] px-8 py-10 md:px-12 md:py-10 flex flex-col md:flex-row items-start bg-primary shadow-figma mb-20 md:mb-24 mt-8 md:mt-0">
            
            {/* Info do Usuário */}
            <div className="flex flex-col gap-1 w-full md:w-[60%] lg:w-1/2 text-center md:text-left text-background relative z-10 pb-16 md:pb-0 px-4 md:px-0">
              <span className="font-subtitle leading-[90%] mb-2 break-words">
                {usuario?.username || "Usuário"}
              </span>
              <span className="font-body mb-2 break-words opacity-90">
                {usuario?.biografia || "Sem biografia definida."}
              </span>
            </div>

            {/* Avatar Centralizado na Borda */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20">
              <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center bg-background shadow-figma border-4 border-transparent overflow-hidden">
                <img
                  src={usuario?.avatar_url || "/AvatarDefault.png"}
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="absolute top-6 right-6 flex gap-3 ">
              <Button
                onClick={() => router.push("/Relatorio")}
                text="Relatório"
                className="bg-background text-foreground font-body font-semibold px-6 py-2 rounded-full shadow-figma hover:shadow-figma-hover hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              />

              <Button
                onClick={() => router.push("/Configuracoes")}
                text={
                  <img
                    src="/Settings.png"
                    alt="Configurações"
                    className="w-[18px] h-[18px] icon-adaptive"
                  />
                }
                className="bg-background text-foreground font-body font-semibold px-6 py-2 rounded-full shadow-figma hover:shadow-figma-hover hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Seção Meus Pictogramas Favoritos */}
          <div className="border border-foreground/10 rounded-3xl p-8 md:p-10 flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between w-full gap-4 flex-nowrap">
              <h2 className="font-subtitle leading-[90%] text-foreground shrink">
                Meus Pictogramas
              </h2>

              <div className="shrink-0">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  text={
                    <img
                      src="/Plus.png"
                      alt="Adicionar"
                      className="w-[18px] h-[18px] icon-adaptive"
                    />
                  }
                  className="bg-background text-foreground font-body font-semibold px-4 py-2 rounded-full shadow-figma hover:shadow-figma-hover hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                />
              </div>
              {isModalOpen && (
                <Mensagem
                  title="Adicione seu próprio pictograma"
                  text="Selecione uma imagem da sua galeria para criar um pictograma personalizado." // Prop obrigatória adicionada
                  textButton="Abrir galeria"
                  onClick={() => setIsModalOpen(false)}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            </div>
            {/* Exibição dos favoritos ou mensagem de vazio */}
            {favoritos.length > 0 ? (
              <PictogramasGrid
                q={null}
                resultados={favoritos}
                categorias={[]}
                limite={4}
              />
            ) : (
              <div className="text-center py-16 font-body text-neutral opacity-60">
                Você ainda não favoritou nenhum pictograma.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}