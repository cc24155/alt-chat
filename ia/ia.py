# ia/data_loader.py
import psycopg2  # ou supabase-py

class DataLoader:
    def __init__(self, db_url: str):
        self.db_url = db_url

    def carregar_sequencias(self, usuario_id: str) -> list[list[int]]:
        # Query: frase_pictograma JOIN frase WHERE usuario_id = ?
        # ORDER BY frase_id, ordem
        # Retorna: [[34560, 2419, 8709], [2419, 1234], ...]
        pass

    def carregar_historico_uso(self, usuario_id: str) -> dict:
        # Query: uso_pictograma WHERE usuario_id = ?
        # Retorna: {pic_id: {"total": 5, "horas": [8,8,12], "dias": [1,1,3]}}
        pass

# ia/sugestor.py
import pickle
from collections import defaultdict

class SugestorPictograma:
    def __init__(self):
        self.modelo = defaultdict(lambda: defaultdict(int))
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

# ia/api.py
from fastapi import FastAPI
from pydantic import BaseModel
from sugestor import SugestorPictograma

app = FastAPI()
sugestor = SugestorPictograma()
sugestor.carregar("modelo.pkl")

class SugerirRequest(BaseModel):
    contexto: list[int]
    usuario_id: str

@app.post("/sugerir")
def sugerir(req: SugerirRequest):
    sugestoes = sugestor.sugerir(req.contexto)
    return {"sugestoes": sugestoes}
    