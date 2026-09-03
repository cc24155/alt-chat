import { seo } from "../seo";

export const metadata = seo.senha;

export default function SenhaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
