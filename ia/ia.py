import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client

try:
    from .sugestor import SugestorPictograma
    from .svo import SugestorSVO
except ImportError:
    from sugestor import SugestorPictograma
    from svo import SugestorSVO


LIMITE_SUGESTOES = 10


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


load_dotenv(".env.local")

url = (
    os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    or os.getenv("SUPABASE_URL")
)

key = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    or os.getenv("SUPABASE_KEY")
)

if not url or not key:
    raise RuntimeError(
        "Variáveis de ambiente do Supabase "
        "não encontradas."
    )


svo = SugestorSVO(
    create_client(url, key)
)

sugestor = SugestorPictograma()

modelo_path = Path(__file__).with_name(
    "modelo.pkl"
)

if not modelo_path.exists():
    raise RuntimeError(
        "modelo.pkl não encontrado. "
        "Execute treinar.py primeiro."
    )

sugestor.carregar(
    str(modelo_path)
)


class SugerirRequest(BaseModel):
    contexto: list[int] | None = None
    contexto_palavras: list[str] | None = None
    usuario_id: str | None = None
    id_atual: int | None = None


def buscar_id_por_palavra(
    palavra: str
) -> int | None:

    palavra = palavra.strip().lower()

    if not palavra:
        return None

    res = (
        svo.supabase
        .table("pictograma")
        .select("arasaac_id")
        .ilike("palavra", palavra)
        .limit(1)
        .execute()
    )

    if not res.data:
        return None

    return int(
        res.data[0]["arasaac_id"]
    )


def normalizar_contexto(
    req: SugerirRequest
) -> list[int]:

    if req.contexto_palavras:
        ids = [
            buscar_id_por_palavra(p)
            for p in req.contexto_palavras
        ]

        # Não altera a estrutura da frase
        # silenciosamente.
        if all(
            _id is not None
            for _id in ids
        ):
            return [
                int(_id)
                for _id in ids
                if _id is not None
            ]

    if req.contexto:
        return [
            int(_id)
            for _id in req.contexto
        ]

    if req.id_atual is not None:
        return [int(req.id_atual)]

    return []


def buscar_palavras_por_id(
    ids: list[int]
) -> dict[int, str]:

    if not ids:
        return {}

    res = (
        svo.supabase
        .table("pictograma")
        .select("arasaac_id, palavra")
        .in_("arasaac_id", ids)
        .execute()
    )

    return {
        int(row["arasaac_id"]):
        str(row.get("palavra", ""))
        for row in res.data
    }


def montar_pictograma(
    _id: int,
    palavra: str = ""
) -> dict:

    return {
        "_id": int(_id),
        "keywords": [
            {"keyword": palavra}
        ],
        "origem": "arasaac",
    }


def gerar_sugestoes(
    contexto: list[int]
) -> list[int]:

    # Nenhuma palavra ainda:
    # oferece eu, tu, você...
    if not contexto:
        return svo.sugerir_sujeitos(
            LIMITE_SUGESTOES
        )

    # Busca bastante candidato primeiro.
    candidatas = sugestor.sugerir(
        contexto,
        top_n=50
    )

    ids = svo.sugerir_svo(
        contexto,
        candidatas,
        limite=LIMITE_SUGESTOES,
    )

    if ids:
        return ids

    # Fallback para algo nunca visto.
    candidatas_globais = (
        sugestor.sugerir_globais(
            top_n=200
        )
    )

    return svo.sugerir_svo(
        contexto,
        candidatas_globais,
        limite=LIMITE_SUGESTOES,
    )


@app.post("/sugerir")
def sugerir(req: SugerirRequest):

    contexto = normalizar_contexto(req)

    ids = gerar_sugestoes(
        contexto
    )

    palavras = buscar_palavras_por_id(
        ids
    )

    return {
        "contexto": contexto,
        "sugestoes": [
            montar_pictograma(
                _id,
                palavras.get(_id, "")
            )
            for _id in ids
        ],
    }


@app.get("/debug/sujeitos")
def debug_sujeitos():

    ids = svo.sugerir_sujeitos(20)

    palavras = buscar_palavras_por_id(
        ids
    )

    return [
        {
            "id": _id,
            "palavra": palavras.get(
                _id,
                ""
            )
        }
        for _id in ids
    ]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000
    )