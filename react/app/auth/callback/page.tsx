"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../loading";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export default function GoogleAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finalizarLogin = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        const user = data.session?.user;
        if (error || !user) throw error ?? new Error("Sessão Google não encontrada.");

        const metadata = user.user_metadata ?? {};
        const email = user.email ?? "";
        const nome = typeof metadata.full_name === "string"
          ? metadata.full_name
          : typeof metadata.name === "string"
            ? metadata.name
            : email.split("@")[0] || "Usuário Google";
        const username = `google_${user.id.replace(/-/g, "").slice(0, 12)}`;
        const senhaHashAleatoria = await bcrypt.hash(crypto.randomUUID(), 10);

        const { error: erroCriacao } = await supabase.from("usuario").upsert(
          {
            id: user.id,
            nome,
            email,
            username,
            senha_hash: senhaHashAleatoria,
            ative: true,
          },
          { onConflict: "id", ignoreDuplicates: true },
        );

        if (erroCriacao) throw erroCriacao;

        router.replace("/Conta");
      } catch (error) {
        console.error("Erro ao finalizar login com Google:", error);
        const detalhe =
          typeof error === "object" && error !== null && "message" in error
            ? String(error.message)
            : "erro inesperado";
        sessionStorage.setItem(
          "google-oauth-error",
          `Não foi possível preparar seu perfil no Supabase: ${detalhe}`,
        );
        router.replace("/Login");
      }
    };

    void finalizarLogin();
  }, [router]);

  return <Loading />;
}
