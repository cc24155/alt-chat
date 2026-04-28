"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";
import { buscarDadosUsuario, criarNovoPic, pegarPicUser } from "./actions";

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
  const [meusPic, setMeusPic] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [descPic, setDescPic] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenNewPic, setIsModalOpenNewPic] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  //tem que fazer tipo um usuario para mostrar os pictogramas feitos pelo usuário na pagina
  const [acessoNegado, setAcessoNegado] = useState(false);

  useEffect(() => {
    const carregarTudo = async () => {
      try {
        setLoading(true);
        const resUser = await buscarDadosUsuario();
        const resMeusPic = await pegarPicUser();

        if (resMeusPic?.success){
          if (resMeusPic.data) {
            setMeusPic(resMeusPic.data);
          }
          else{
            console.log("Não conseguiu pegar os meus pictogramas");
          }
        }

        if (resUser.success) {
          // 1. Define os dados do perfil
          if (resUser.dadosUser) {
            setUsuario(resUser.dadosUser);
          }
          // 2. Define os favoritos que a Action buscou na API Arasaac
          if (resUser.favoritos) {
            setFavoritos(resUser.favoritos);
          }
        } else {
          // Se não houver sucesso (ex: deslogado), manda para o login
          setAcessoNegado(true);
        }
      } catch (err) {
        console.error("Erro ao carregar dados da conta:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarTudo();
  }, [router]);

  const handleButtonClick = async (e?: React.MouseEvent) =>{
    if (e) e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();   //pega por ref o input declarado la emvaixo
    } 
    else {
      console.error("A referência do input não foi encontrada!");
    }
  }

  const handleSalvar = async () => {
    if (!selectedFile || !descPic) {
      alert("Preencha a descrição e selecione uma imagem!");
      return;
    }

    const resultado = await criarNovoPic(descPic, selectedFile);

    if (resultado.success) {
      alert("Salvo com sucesso!");
      setIsModalOpenNewPic(false);
      // Opcional: atualizar a lista de pictogramas na tela aqui
    } else {
      alert("Erro: " + resultado.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-foreground font-body animate-pulse">Carregando seu perfil...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
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
                  src={usuario?.avatar_url || "/User.png"}
                  className="w-full h-full object-cover icon-adaptive"
                  alt="Avatar"
                />

                {/* Overlay com lápis no hover */}
                <label className="absolute inset-0 rounded-full flex items-center justify-center
                       bg-foreground/0 hover:bg-foreground/40
                       transition-all cursor-pointer group">
                  <img
                    src="/Edit-icon.png"
                    alt="Editar foto"
                    className="w-7 h-7 icon-adaptive opacity-0 group-hover:opacity-100 transition-all"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) { }
                      //handleUploadAvatar(file); // ← função que você vai criar
                    }}
                  />
                </label>
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

          {/* Seção Meus Pictogramas Favoritos*/}
          <div className="border border-foreground/10 rounded-3xl p-8 md:p-10 flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between w-full gap-4 flex-nowrap">
              <h2 className="font-subtitle leading-[90%] text-foreground shrink">
                Pictogramas Favoritos
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
                  onClick={() => setIsModalOpen(false)} // por enquanto só fecha a mensagem, depois pode abrir a galeria do dispositivo
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

          {/* Seção Meus Pictogramas */}
          <div className="border border-foreground/10 rounded-3xl p-8 md:p-10 flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between w-full gap-4 flex-nowrap">
              <h2 className="font-subtitle leading-[90%] text-foreground shrink">
                Meus Pictogramas
              </h2>

              <div className="shrink-0">
                <Button
                  onClick={() => setIsModalOpenNewPic(true)}
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
              {isModalOpenNewPic && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50"> 
                {/* Adicionei classes de overlay acima para ele flutuar na tela */}
                <div className="bg-background p-8 rounded-3xl shadow-figma border border-foreground/10">
                  <h2 className="font-subtitle mb-4 text-title">NOVO PICTOGRAMA</h2>
                  <form className="flex flex-col gap-4">
                    <label className="font-body">Descrição do pictograma:</label>
                    <input 
                      className="bg-transparent border-b border-foreground p-2"
                      value={descPic} 
                      onChange={(e) => setDescPic(e.target.value)} 
                      type="text" 
                    />
                    <label className="font-body">Imagem do pictograma:</label>
                    <input 
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*" 
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    <button 
                      type="button" // Importante: ser type button para não dar submit no form
                      onClick={handleButtonClick}
                      className="bg-secondary/20 text-foreground p-3 rounded-xl border border-dashed border-foreground/30 hover:bg-secondary/30 transition-all">
                      {selectedFile ? `Arquivo: ${selectedFile.name}` : "Selecionar Imagem"}
                    </button>
                    <div className="flex gap-4 mt-4">
                      <Button text="Cancelar" onClick={() => setIsModalOpenNewPic(false)} />
                      <Button text="Salvar" onClick={handleSalvar} className="bg-primary text-background" />
                    </div>
                  </form>
                </div>
                </div> 
              )}
            </div>
            {/* Exibição dos favoritos ou mensagem de vazio */}
            {meusPic.length > 0 ? (
              <PictogramasGrid
                q={null}
                resultados={meusPic}
                categorias={[]}
                limite={4}
              />
            ) : (
              <div className="text-center py-16 font-body text-neutral opacity-60">
                Você ainda não criou nenhum pictograma.
              </div>
            )}
          </div>

          {/* Seção Pictogramas Mais Usados*/}
          <div className="border border-foreground/10 rounded-3xl p-8 md:p-10 flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between w-full gap-4 flex-nowrap">
              <h2 className="font-subtitle leading-[90%] text-foreground shrink">
                Pictogramas Mais Usados
              </h2>
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
                Você ainda não usou nenhum pictograma.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
