import time
import requests
from supabase import create_client, Client
from pictogramas import Pictograma
import supabase

urlSupabase = "https://qtgkewthlpagnbiavxof.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Z2tld3RobHBhZ25iaWF2eG9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk4MDAxMCwiZXhwIjoyMDkxNTU2MDEwfQ.FEhZAVvA7iEI-wY_ce4UUCQ0vCojfYdATuJ7LPrbYWQ"

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
    
for i in range(1, 1000):
    buscarESalvar(i)
    time.sleep(0.5)  # Atraso de 0,5 segundos entre as requisições