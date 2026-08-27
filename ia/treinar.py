import json
import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import Client, create_client

from sugestor import SugestorPictograma


load_dotenv(".env.local")

url = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or os.getenv("SUPABASE_URL")
key = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    or os.getenv("SUPABASE_KEY")
)
if not url or not key:
    raise RuntimeError("Variáveis de ambiente do Supabase não encontradas.")

supabase: Client = create_client(url, key)

# O cadastro grava cada frase como, por exemplo, "[10, 20, 30]".
resposta = supabase.table("frase_pictograma").select("lista_pictograma").execute()
sequencias = []
for linha in resposta.data:
    try:
        sequencia = json.loads(linha["lista_pictograma"])
    except (KeyError, TypeError, json.JSONDecodeError):
        print(f"Frase ignorada por estar em formato inválido: {linha}")
        continue
    if isinstance(sequencia, list) and len(sequencia) == 3 and all(isinstance(i, int) for i in sequencia):
        sequencias.append(sequencia)

if not sequencias:
    raise RuntimeError("Não há frases SVO válidas no banco para treinar.")

sugestor = SugestorPictograma()
sugestor.treinar(sequencias)
sugestor.salvar(str(Path(__file__).with_name("modelo.pkl")))
print(f"Modelo treinado com {len(sequencias)} frases SVO confirmadas.")
