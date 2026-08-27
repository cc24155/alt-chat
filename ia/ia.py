import os

# ia/data_loader.py

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


from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client

try:
    from .sugestor import SugestorPictograma
    from .svo import SugestorSVO
except ImportError:
    from sugestor import SugestorPictograma
    from svo import SugestorSVO
    
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sugestor = SugestorPictograma()
modelo_path = Path(__file__).with_name("modelo.pkl")

if modelo_path.exists():
    sugestor.carregar(str(modelo_path))

load_dotenv(".env.local")
url = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY") or os.getenv("SUPABASE_KEY")
if not url or not key:
    raise RuntimeError("Variáveis de ambiente do Supabase não encontradas.")
svo = SugestorSVO(create_client(url, key))

class SugerirRequest(BaseModel):
    contexto: list[int] | None = None
    usuario_id: str | None = None
    id_atual: int | None = None

def montar_pictograma(_id: int, palavra: str = "sugestao") -> dict:
    return {
        "_id": _id,
        "keywords": [{"keyword": palavra}],
        "origem": "arasaac",
    }

@app.post("/sugerir")
def sugerir(req: SugerirRequest):
    contexto = req.contexto or ([req.id_atual] if req.id_atual is not None else [])
    if not contexto:
        ids_sugeridos = svo.sugerir_sujeitos()
    else:
        candidatas = sugestor.sugerir(contexto)
        ids_sugeridos = svo.sugerir_svo(contexto, candidatas)

    return {"sugestoes": [montar_pictograma(_id) for _id in ids_sugeridos]}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)


# GEMINI:

# Ordem Sintática (Sequência): Peso 5 (É o mais importante para a frase fazer sentido).
# Frequência Geral (Ordem de Uso): Peso 3 (Coisas que o usuário ama usar no geral).
# Hora do Dia: Peso 2 (Se combina com o horário atual, ganha um bônus).
# Dia da Semana: Peso 1 (Se combina com o dia atual, ganha um bônus menor).

# $$\text{Pontuação} = (\text{Votos da Sequência} \times 5) + (\text{Votos de Uso} \times 3) + (\text{Bônus Hora} \times 2) + (\text{Bônus Dia} \times 1)$$

# import os
# import pickle
# from collections import defaultdict
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel

# app = FastAPI(title="IA de Digitação Preditiva - CAA")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class SugestorPictograma:
#     def __init__(self):
#         self.modelo = defaultdict(lambda: defaultdict(int)) 

#     def sugerir(self, contexto: list[int], top_n: int = 2) -> list[int]:
#         if not contexto:
#             return []
#         ultimo = contexto[-1]
#         candidatos = self.modelo.get(ultimo, {})
#         return sorted(candidatos, key=candidatos.get, reverse=True)[:top_n]

# sugestor = SugestorPictograma()

# class RequestSugestao(BaseModel):
#     id_atual: int  # Recebe o ID numérico (_id) do card digitado

# @app.post("/sugerir")
# def sugerir_proximo(req: RequestSugestao):
#     ids_sugeridos = sugestor.sugerir(contexto=[req.id_atual])
    
#     # Se a IA ainda não aprendeu nada no banco, deixamos o modo de teste robusto:
#     if not ids_sugeridos:
#         # AGORA COBRE QUALQUER ID: Se receber o ID de "querer", "eu" ou qualquer outro, 
#         # ele vai injetar as opções de continuação na tela para o front-end funcionar!
#         return {
#             "sugestoes": [
#                 {
#                     "_id": 2435, 
#                     "keywords": [{"keyword": "comer"}],
#                     "origem": "arasaac"
#                 },
#                 {
#                     "_id": 2555, 
#                     "keywords": [{"keyword": "brincar"}],
#                     "origem": "arasaac"
#                 }
#             ]
#         }
        
#     # Quando o banco estiver integrado e o modelo treinado, essa parte cria a lista dinâmica
#     resposta = []
#     for _id in ids_sugeridos:
#         resposta.append({
#             "_id": _id,
#             "keywords": [{"keyword": "sugestão"}],
#             "origem": "arasaac"
#         })
#     return {"sugestoes": resposta}
    
# Execute com: uvicorn app_ia:app --reload
