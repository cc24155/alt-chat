  "use client";
  import { useEffect, useState } from "react";

  import NavigationBlue from "../components/NavigationBlue";
  import Footer from "../components/Footer";
  import Link from "next/link";
  import { useRouter } from "next/navigation";

  import { Pictograma, buscarFavoritos } from "../../arasaac api/arasaac"; 
  import { PictogramasGrid } from "../components/PictogramaSection";
  import Button from "../components/Button";


  export default function ContaPage() {
    const [favoritos, setFavoritos] = useState<Pictograma[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Exemplo de IDs salvos para trocar pra quando vir proo banco de dados
    const meusIdsFavoritos = [34560, 34558, 34559, 34557];
    
    useEffect(() => {
      const carregarFavoritos = async () => {
        setLoading(true);
        const dados = await buscarFavoritos(meusIdsFavoritos);
        setFavoritos(dados);
        setLoading(false);
      };
      carregarFavoritos();
    }, []);
    if (loading)
      return <div className="text-foreground text-center py-20">Carregando...</div>;


    return (
      <div className="w-full min-h-screen bg-background">
        <NavigationBlue />

        <main className="w-full py-[120px] px-8">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
            
            {/* Card do Usuário Dinâmico - relative e mb-24 para dar espaço pro avatar */}
            <div className="relative rounded-[32px] px-8 py-10 md:px-12 md:py-10 flex flex-col md:flex-row items-start bg-primary shadow-figma mb-20 md:mb-24 mt-8 md:mt-0">
              
            {/* Info do Usuário */}
            <div className="flex flex-col gap-1 w-full md:w-[60%] lg:w-1/2 text-center md:text-left text-background relative z-10 pb-16 md:pb-0 px-4 md:px-0">
              
              {/* Tamanho dinâmico para o nome do usuário */}
              <h1 className="font-subtitle text-3xl md:text-4xl lg:text-5xl leading-[90%] mb-2 break-words">
                usuário
              </h1>
              
              {/* Tamanho dinâmico e proteção de quebra de linha para a bio */}
              <p className="font-body text-sm md:text-base opacity-90 break-words">
                biografia biografia biografia
              </p>
              <p className="font-body text-sm md:text-base opacity-90 break-words">
                biografia biografia biografia
              </p>
              <p className="font-body text-sm md:text-base opacity-90 break-words">
                biografia biografia biografia
              </p>
            </div>

              {/* Avatar na Borda Inferior Central (Estilo Figma) */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20">
                  <div className="w-max h-max md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center bg-background shadow-figma border-4 border-transparent">
                      <Link href="/">
                          <img className="theme-image w-20 md:w-28 object-contain" alt="logotipo" />
                      </Link>
                  </div>
              </div>

              <div className="absolute top-6 right-6 flex gap-3 ">
                <Button
                  onClick ={() => router.push("/Relatorio")}
                  text="Relatório"
                  className="bg-background text-foreground font-body font-semibold px-6 py-2 rounded-full shadow-figma hover:shadow-figma-hover hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                />
                
                <Button 
                  onClick={() => router.push("/Configuracoes")}
                  text={<img src="/Settings.png" alt="Configurações" className="w-[18px] h-[18px] dark:invert opacity-70" />}
                  className="bg-background text-foreground font-body font-semibold px-6 py-2 rounded-full shadow-figma hover:shadow-figma-hover hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Seção Meus Pictogramas */}
            <div className="border border-foreground/10 rounded-3xl p-8 md:p-10 flex flex-col gap-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                
                <h2 className="font-subtitle leading-[90%] text-foreground">
                  Meus Pictogramas
                </h2>
              </div>

              {loading ? (
                <div className="text-center py-16 font-body text-neutral">Buscando pictogramas...</div>
              ) : (
                <PictogramasGrid 
                  q={null} 
                  resultados={favoritos} 
                  categorias={[]} 
                  limite={4} 
                />
              )}
            </div>

          </div>
        </main>

        <Footer />
      </div>
    );
  }
