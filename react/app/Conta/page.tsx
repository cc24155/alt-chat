"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import NavigationBlue from "../components/NavigationBlue";
import Footer from "../components/Footer";
import { buscarDadosUsuario, criarNovoPic, pegarPicUser } from "./actions";

import { PictogramasGrid } from "../components/PictogramaSection";
import Button from "../components/Button";
import Mensagem from "../components/Mensagem";
import { EstaLogado } from "../actions";
import { Pictograma } from "@/arasaac api/arasaac";

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
            const apenasUrls = meusPic.map(pic => pic.url_imagem);
            const apenasDescricoes = meusPic.map(pic => pic.descricao);
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

    // 1. Pega o usuário logado no cliente
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    // 2. Upload direto do browser pro Supabase Storage (não passa pelo Next.js)
    const fileName = `${Date.now()}-${selectedFile.name}`;
    const { error: uploadError } = await supabaseClient.storage
      .from('pictogramas')
      .upload(`usuarios/${user.id}/${fileName}`, selectedFile);

    if (uploadError) {
      alert("Erro no upload: " + uploadError.message);
      return;
    }

    // 3. Pega a URL pública
    const { data: { publicUrl } } = supabaseClient.storage
      .from('pictogramas')
      .getPublicUrl(`usuarios/${user.id}/${fileName}`);

    // 4. Salva só a URL (string) na Server Action
    const resultado = await criarNovoPic(descPic, publicUrl);

    if (resultado.success) {
      alert("Salvo com sucesso!");
      setIsModalOpenNewPic(false);
      setDescPic("");
      setSelectedFile(null);
      const resMeusPic = await pegarPicUser();
      if (resMeusPic?.success && resMeusPic.data) setMeusPic(resMeusPic.data);
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
              <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px]">

                {/* Foto */}
                <div className="w-full h-full rounded-full flex items-center justify-center bg-background shadow-figma border-4 border-transparent overflow-hidden">
                  <img
                    src={usuario?.avatar_url || "/User.png"}
                    className="w-full h-full object-cover icon-adaptive"
                    alt="Avatar"
                  />
                </div>

                {/* Lápis grudado no canto inferior direito */}
                <label className="absolute bottom-1 right-1 w-9 h-9
                       bg-background rounded-full shadow-figma
                       flex items-center justify-center
                       hover:bg-neutral transition-all cursor-pointer">
                  <img
                    src="/Edit-pencil.png"
                    alt="Editar foto"
                    className="w-5 h-5 icon-adaptive"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // handleUploadAvatar(file);
                      }
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
                <Mensagem
                  title="NOVO PICTOGRAMA"
                  text={"Adicione seu próprio pictograma"}
                  textButton="Salvar"
                  onClick={handleSalvar}
                  onClose={() => setIsModalOpenNewPic(false)}
                  >
                  
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
                    type="button"
                    onClick={handleButtonClick}
                    className="bg-secondary/20 text-foreground p-3 rounded-xl border border-dashed border-foreground/30 hover:bg-secondary/30 transition-all">
                    {selectedFile ? `Arquivo: ${selectedFile.name}` : "Selecionar Imagem"}
                  </button>
                </Mensagem>
              )}
            </div>
            {/* Exibição dos MEUS PICTOGRAMAS ou mensagem de vazio */}
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
