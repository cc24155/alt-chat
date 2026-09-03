import { seo } from "../seo";

export const metadata = seo.biblioteca;

export default function BibliotecaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
