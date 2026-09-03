import { seo } from "../seo";

export const metadata = seo.configuracoes;

export default function ConfiguracoesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
