import pickle
from collections import Counter, defaultdict


def _novo_contador():
    return defaultdict(int)


class SugestorPictograma:
    def __init__(self):
        self.modelo = defaultdict(_novo_contador)

    def treinar(self, sequencias: list[list[int]]):
        for sequencia in sequencias:
            if len(sequencia) < 2:
                continue

            for i in range(len(sequencia) - 1):
                contexto = int(sequencia[i])
                proximo = int(sequencia[i + 1])
                self.modelo[contexto][proximo] += 1

    def sugerir(self, contexto: list[int], top_n: int = 50) -> list[int]:
        if not contexto:
            return []

        ultimo = int(contexto[-1])
        candidatos = self.modelo.get(ultimo, {})

        ordenados = sorted(
            candidatos,
            key=candidatos.get,
            reverse=True
        )

        return [int(_id) for _id in ordenados[:top_n]]

    def sugerir_globais(self, top_n: int = 200) -> list[int]:
        frequencias = Counter()

        for candidatos in self.modelo.values():
            frequencias.update(candidatos)

        return [
            int(_id)
            for _id, _ in frequencias.most_common(top_n)
        ]

    def personalizar(
        self,
        sugestoes: list[int],
        historico: dict
    ) -> list[int]:

        if not historico:
            return sugestoes

        def pontuacao(_id: int):
            dados = historico.get(_id, {})
            return int(dados.get("total", 0))

        return sorted(
            sugestoes,
            key=pontuacao,
            reverse=True
        )

    def salvar(self, caminho: str):
        with open(caminho, "wb") as f:
            pickle.dump(self.modelo, f)

    def carregar(self, caminho: str):
        with open(caminho, "rb") as f:
            self.modelo = pickle.load(f)