import { seo } from "../seo";

export const metadata = seo.conta;

export default function ContaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
