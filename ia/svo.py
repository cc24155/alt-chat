PRONOMES_PRIORITARIOS = [
    "eu",
    "tu",
    "você",
    "ele",
    "ela",
    "nós",
    "vocês",
    "eles",
    "elas",
]

CLASSES_SUJEITO = {
    "pronome",
    "substantivo",
}

CLASSES_APOS_SUJEITO = [
    "verbo",
]

CLASSES_APOS_VERBO = [
    "verbo",
    "substantivo",
    "preposição",
    "pronome",
    "adjetivo",
    "interjeição",
    "outros",
]


class SugestorSVO:
    def __init__(self, supabase_client):
        self.supabase = supabase_client
        self._cache_sujeitos: list[int] | None = None

    def sugerir_svo(
        self,
        contexto: list[int],
        candidatas_brutas: list[int],
        limite: int = 10,
    ) -> list[int]:

        if not candidatas_brutas:
            return []

        if not contexto:
            filtradas = self.filtrar_por_classe(
                candidatas_brutas,
                ["pronome", "substantivo"],
            )

            return filtradas[:limite]

        classes_contexto = self.buscar_classes(contexto)

        classe_primeiro = classes_contexto.get(
            int(contexto[0])
        )

        # sujeito -> verbo
        if (
            len(contexto) == 1
            and classe_primeiro in CLASSES_SUJEITO
        ):
            filtradas = self.filtrar_por_classe(
                candidatas_brutas,
                CLASSES_APOS_SUJEITO,
            )

            return filtradas[:limite]

        # Depois do verbo:
        # verbo, substantivo, preposição etc.
        #
        # Isso permite, por exemplo:
        # eu -> querer -> ir
        filtradas = self.filtrar_por_classe(
            candidatas_brutas,
            CLASSES_APOS_VERBO,
        )

        return filtradas[:limite]

    def _buscar_id_por_palavra(
        self,
        palavra: str
    ) -> int | None:

        res = (
            self.supabase
            .table("pictograma")
            .select("arasaac_id")
            .ilike("palavra", palavra)
            .limit(1)
            .execute()
        )

        if not res.data:
            return None

        return int(res.data[0]["arasaac_id"])

    def sugerir_sujeitos(
        self,
        limite: int = 20
    ) -> list[int]:

        # Primeiro procura explicitamente
        # todos os pronomes pessoais.
        if self._cache_sujeitos is None:
            ids_pronomes = []

            for palavra in PRONOMES_PRIORITARIOS:
                _id = self._buscar_id_por_palavra(
                    palavra
                )

                if (
                    _id is not None
                    and _id not in ids_pronomes
                ):
                    ids_pronomes.append(_id)

            self._cache_sujeitos = ids_pronomes

        ids = list(self._cache_sujeitos)

        # Depois completa com sujeitos substantivos:
        # mãe, pai, professor, criança etc.
        if len(ids) < limite:
            res = (
                self.supabase
                .table("pictograma")
                .select("arasaac_id, palavra")
                .eq("classe", "substantivo")
                .limit(max(limite * 2, 40))
                .execute()
            )

            for row in res.data:
                _id = int(row["arasaac_id"])

                if _id not in ids:
                    ids.append(_id)

                if len(ids) >= limite:
                    break

        return ids[:limite]

    def buscar_classes(
        self,
        ids: list[int]
    ) -> dict[int, str]:

        if not ids:
            return {}

        ids_unicos = list(
            dict.fromkeys(
                int(_id)
                for _id in ids
            )
        )

        res = (
            self.supabase
            .table("pictograma")
            .select("arasaac_id, classe")
            .in_("arasaac_id", ids_unicos)
            .execute()
        )

        return {
            int(row["arasaac_id"]): str(
                row.get("classe", "")
            )
            for row in res.data
        }

    def filtrar_por_classe(
        self,
        ids: list[int],
        classes_permitidas: list[str],
    ) -> list[int]:

        if not ids:
            return []

        ids_unicos = list(
            dict.fromkeys(
                int(_id)
                for _id in ids
            )
        )

        res = (
            self.supabase
            .table("pictograma")
            .select("arasaac_id")
            .in_("arasaac_id", ids_unicos)
            .in_("classe", classes_permitidas)
            .execute()
        )

        permitidos = {
            int(row["arasaac_id"])
            for row in res.data
        }

        # Muito importante:
        # mantém a ordem calculada pela IA.
        return [
            _id
            for _id in ids_unicos
            if _id in permitidos
        ]