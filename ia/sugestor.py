import pickle
from collections import defaultdict


def _novo_contador():
    return defaultdict(int)


class SugestorPictograma:
    def __init__(self):
        self.modelo = defaultdict(_novo_contador)
        # {"QUERO": {"COMER": 5, "IR": 2, "BEBER": 3}}

    def treinar(self, sequencias: list[list[int]]):
        for sequencia in sequencias:
            for i in range(len(sequencia) - 1):
                contexto = sequencia[i]
                proximo = sequencia[i + 1]
                self.modelo[contexto][proximo] += 1

    def sugerir(self, contexto: list[int], top_n: int = 5) -> list[int]:
        if not contexto:
            return []
        ultimo = contexto[-1]
        candidatos = self.modelo.get(ultimo, {})
        ordenados = sorted(candidatos, key=candidatos.get, reverse=True)
        return ordenados[:top_n]

    def personalizar(self, sugestoes: list[int], historico: dict) -> list[int]:
        # Reordena sugestoes dando peso extra para pics muito usados pelo usuário
        pass

    def salvar(self, caminho: str):
        with open(caminho, "wb") as f:
            pickle.dump(self.modelo, f)

    def carregar(self, caminho: str):
        with open(caminho, "rb") as f:
            self.modelo = pickle.load(f)
