import json
import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import Client, create_client

from sugestor import SugestorPictograma


PRONOMES_PESSOAIS = [
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

VERBOS_COMUNS = [
    "querer",
    "comer",
    "beber",
    "brincar",
    "ir",
    "estar",
    "ter",
    "gostar",
    "precisar",
    "ver",
    "ajudar",
    "dormir",
    "estudar",
    "trabalhar",
]

# Cada relação básica é apresentada
# algumas vezes para não ficar fraca demais.
PESO_BASE_PRONOMES = 3


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

supabase: Client = create_client(url, key)


def buscar_id_exato(
    palavra: str,
    classe: str | None = None,
) -> int | None:

    consulta = (
        supabase
        .table("pictograma")
        .select("arasaac_id, palavra, classe")
        .ilike(
            "palavra",
            palavra.strip().lower()
        )
    )

    if classe:
        consulta = consulta.eq(
            "classe",
            classe
        )

    res = consulta.limit(1).execute()

    if not res.data:
        return None

    return int(
        res.data[0]["arasaac_id"]
    )


def buscar_id_com_fallback(
    palavra: str,
    classe: str
) -> int | None:

    return (
        buscar_id_exato(
            palavra,
            classe
        )
        or buscar_id_exato(palavra)
    )


def gerar_dataset_pronomes():
    ids_pronomes = {}
    ids_verbos = {}

    ausentes = []

    for pronome in PRONOMES_PESSOAIS:
        _id = buscar_id_com_fallback(
            pronome,
            "pronome"
        )

        if _id is None:
            ausentes.append(pronome)
        else:
            ids_pronomes[pronome] = _id

    for verbo in VERBOS_COMUNS:
        _id = buscar_id_com_fallback(
            verbo,
            "verbo"
        )

        if _id is None:
            ausentes.append(verbo)
        else:
            ids_verbos[verbo] = _id

    sequencias = []

    for id_pronome in ids_pronomes.values():
        for id_verbo in ids_verbos.values():

            for _ in range(
                PESO_BASE_PRONOMES
            ):
                sequencias.append([
                    id_pronome,
                    id_verbo
                ])

    return (
        sequencias,
        sorted(set(ausentes))
    )


def carregar_sequencias_banco():
    resposta = (
        supabase
        .table("frase_pictograma")
        .select("lista_pictograma")
        .execute()
    )

    sequencias = []

    for linha in resposta.data:
        try:
            sequencia = json.loads(
                linha["lista_pictograma"]
            )

        except (
            KeyError,
            TypeError,
            json.JSONDecodeError
        ):
            print(
                "Frase ignorada por estar "
                f"em formato inválido: {linha}"
            )
            continue

        if (
            isinstance(sequencia, list)
            and len(sequencia) >= 2
            and all(
                isinstance(i, int)
                for i in sequencia
            )
        ):
            sequencias.append(sequencia)

    return sequencias


sequencias_banco = (
    carregar_sequencias_banco()
)

sequencias_pronomes, ausentes = (
    gerar_dataset_pronomes()
)

sequencias = (
    sequencias_banco
    + sequencias_pronomes
)

if not sequencias:
    raise RuntimeError(
        "Não há sequências válidas "
        "para treinar."
    )


sugestor = SugestorPictograma()

sugestor.treinar(sequencias)

sugestor.salvar(
    str(
        Path(__file__).with_name(
            "modelo.pkl"
        )
    )
)


print(
    f"Frases do banco: "
    f"{len(sequencias_banco)}"
)

print(
    "Transições-base de pronomes: "
    f"{len(sequencias_pronomes)}"
)

if ausentes:
    print(
        "Palavras não encontradas "
        "no banco:",
        ", ".join(ausentes)
    )

print(
    "Modelo treinado com "
    f"{len(sequencias)} sequências."
)