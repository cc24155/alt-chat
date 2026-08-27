import time
import os
import requests
from supabase import create_client, Client
from pictogramas import Pictograma

urlSupabase = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

if not urlSupabase or not key:
    raise RuntimeError("SUPABASE_URL and SUPABASE_KEY must be set in environment")

supabase: Client = create_client(urlSupabase, key)

def buscarESalvar(idPic):
    pic = Pictograma()
    sucesso = pic.buscar_dados(idPic)
    if not sucesso:
        print(f"Erro ao buscar pictograma {idPic}.")
        return
    dados = {"arasaac_id": pic.id, "palavra": pic.palavra, "classe": pic.classe_gramatical}

    supabase.table("pictograma").upsert(dados).execute()
    print(f"Pictograma {pic.id} ({pic.palavra}) ({pic.classe_gramatical}) salvo!")


if __name__ == "__main__":
    for i in range(1, 1000):
        buscarESalvar(i)
        time.sleep(0.5)  # Atraso de 0,5 segundos entre as requisições