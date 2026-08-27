"""Cadastro manual de frases SVO para formar os dados de treinamento.

Execute este arquivo e informe uma frase por vez. Somente frases que existam
na tabela ``pictograma``, sigam SVO e sejam confirmadas pela pessoa usuária
serão gravadas.
"""

import json
import os

from dotenv import load_dotenv
from supabase import Client, create_client


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

CLASSES_SUJEITO = {"pronome", "substantivo"}
CLASSE_VERBO = "verbo"
CLASSES_OBJETO = {"substantivo"}


def buscar_pictograma(palavra: str) -> dict | None:
    """Devolve o pictograma cadastrado para uma palavra, ou None."""
    resultado = (
        supabase.table("pictograma")
        .select("arasaac_id, palavra, classe")
        .eq("palavra", palavra.strip().lower())
        .limit(1)
        .execute()
    )
    return resultado.data[0] if resultado.data else None


def validar_svo(palavras: list[str]) -> tuple[bool, str, list[dict]]:
    """Valida a estrutura [sujeito, verbo, objeto] usando o banco."""
    if len(palavras) != 3:
        return False, "Use exatamente três palavras: sujeito verbo objeto.", []

    pictogramas = []
    for palavra in palavras:
        pictograma = buscar_pictograma(palavra)
        if not pictograma:
            return False, f"'{palavra}' não está cadastrada na tabela pictograma.", []
        pictogramas.append(pictograma)

    classes = [p["classe"] for p in pictogramas]
    if classes[0] not in CLASSES_SUJEITO:
        return False, "A primeira palavra precisa ser pronome ou substantivo (sujeito).", []
    if classes[1] != CLASSE_VERBO:
        return False, "A segunda palavra precisa ser um verbo.", []
    if classes[2] not in CLASSES_OBJETO:
        return False, "A terceira palavra precisa ser um substantivo (objeto).", []

    return True, "Estrutura SVO válida.", pictogramas


def salvar_frase(palavras: list[str]) -> bool:
    """Valida e grava uma frase aprovada no formato usado pelo treinamento."""
    valida, mensagem, pictogramas = validar_svo(palavras)
    if not valida:
        print(f"Frase não salva: {mensagem}")
        return False

    frase = " ".join(palavras)
    confirmar = input(f"'{frase}' faz sentido no contexto do usuário? [s/N] ").strip().lower()
    if confirmar not in {"s", "sim"}:
        print("Frase descartada. Ela não será usada no treinamento.")
        return False

    ids = [pictograma["arasaac_id"] for pictograma in pictogramas]
    lista_pictograma = json.dumps(ids)
    existente = (
        supabase.table("frase_pictograma")
        .select("lista_pictograma")
        .eq("lista_pictograma", lista_pictograma)
        .limit(1)
        .execute()
    )
    if existente.data:
        print("Essa frase já está cadastrada.")
        return False

    supabase.table("frase_pictograma").insert({"lista_pictograma": lista_pictograma}).execute()
    print("Frase salva. Execute 'python treinar.py' para atualizar o modelo.")
    return True


def executar_cadastro() -> None:
    print("Digite frases no formato: sujeito verbo objeto. Digite 'sair' para encerrar.")
    while True:
        entrada = input("> ").strip()
        if entrada.lower() in {"sair", "exit", "quit"}:
            break
        if entrada:
            salvar_frase(entrada.lower().split())


if __name__ == "__main__":
    executar_cadastro()
