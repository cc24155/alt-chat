import { seo } from "../seo";

export const metadata = seo.relatorio;

export default function RelatorioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
