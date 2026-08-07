import time
import requests
#from supabase import create_client
from pictogramas import Pictograma
import supabase

#urlSupabase = "URL_DO_SUPABASE"
#key = "SUA_SERVICE_KEY"

def buscarESalvar(idPic):
    pic = Pictograma()
    dados = pic.buscar_dados(idPic)
    supabase.table("pictograma").upsert(dados).execute()
    print(f"Pictograma {pic.id} ({pic.palavra}) ({pic.classe_gramatical}) salvo!")
    
#fazwr um range oara aducuibar varios
