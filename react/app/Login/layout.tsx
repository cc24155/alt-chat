import { seo } from "../seo";

export const metadata = seo.login;

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
