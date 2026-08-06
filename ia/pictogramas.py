from supabase import create_client
import requests

#urlSupabase = "URL_DO_SUPABASE"
#key = "SUA_SERVICE_KEY"

#supabase = create_client(url, key)

def buscarPictogramas(id):
    url = f'https://api.arasaac.org/api/pictograms/{id}'
    resposta = requests.get(url)
    json = resposta.json()
    #agora precisa pegar esses jsons e guardar no supabase