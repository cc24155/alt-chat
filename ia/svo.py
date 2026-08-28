class SugestorSVO:
    """Aplica a ordem sujeito -> verbo -> complemento às sugestões do modelo."""

    def __init__(self, supabase_client):
        self.supabase = supabase_client

    def sugerir_svo(self, contexto: list[int], candidatas_brutas: list[int]) -> list[int]:
        # A posição, e não somente a classe da última palavra, define a regra.
        # Isso impede que um substantivo usado como objeto reinicie a frase.
        if not contexto:
            return self.filtrar_por_classe(candidatas_brutas, ["pronome", "substantivo"])
        if len(contexto) == 1:
            return self.filtrar_por_classe(candidatas_brutas, ["verbo"])
        return self.filtrar_por_classe(
            candidatas_brutas,
            ["substantivo", "preposição", "pronome", "adjetivo", "outros"],
        )

    def sugerir_sujeitos(self, limite: int = 20) -> list[int]:
        """Sugere inícios possíveis para uma nova frase."""
        res = (
            self.supabase.table("pictograma")
            .select("arasaac_id, palavra")
            .in_("classe", ["pronome", "substantivo"])
            .limit(max(limite, 20))
            .execute()
        )
        sujeitos = sorted(
            res.data,
            key=lambda row: (row.get("palavra", "").lower() not in {"eu", "tu"}, row.get("palavra", "").lower()),
        )
        return [int(row["arasaac_id"]) for row in sujeitos[:limite]]

    def filtrar_por_classe(self, ids: list[int], classes_permitidas: list[str]) -> list[int]:
        if not ids:
            return []
        res = (
            self.supabase.table("pictograma")
            .select("arasaac_id")
            .in_("arasaac_id", ids)
            .in_("classe", classes_permitidas)
            .execute()
        )
        return [row["arasaac_id"] for row in res.data]
