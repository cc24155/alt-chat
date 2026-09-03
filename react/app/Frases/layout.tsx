import { seo } from "../seo";

export const metadata = seo.frases;

export default function FrasesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
