import { seo } from "../seo";

export const metadata = seo.cadastro;

export default function CadastroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
