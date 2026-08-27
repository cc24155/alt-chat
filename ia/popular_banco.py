import time
from supabase import create_client, Client
from pictogramas import Pictograma

urlSupabase = "https://qtgkewthlpagnbiavxof.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Z2tld3RobHBhZ25iaWF2eG9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk4MDAxMCwiZXhwIjoyMDkxNTU2MDEwfQ.FEhZAVvA7iEI-wY_ce4UUCQ0vCojfYdATuJ7LPrbYWQ"

supabase: Client = create_client(urlSupabase, key)

def buscarESalvar(idPic):
    pic = Pictograma(idPic)
    if not pic.buscar_dados():
        print(f"Pictograma {idPic} nao foi salvo.")
        return False

    dados = {"arasaac_id": pic.id, "palavra": pic.palavra, "classe": pic.classe_gramatical}

    try:
        supabase.table("pictograma").upsert(dados).execute()
    except Exception as erro:
        print(f"Erro ao salvar pictograma {pic.id} no banco: {erro}")
        return False

    print(f"Pictograma {pic.id} ({pic.palavra}) ({pic.classe_gramatical}) salvo!")
    return True
    
# for i in range(1, 1000):
#     try:
#         buscarESalvar(i)
#         time.sleep(0.5)  # Atraso de 0,5 segundos entre as requisições
#     except Exception as e:
#         print(e)
if __name__ == "__main__":
    for i in range(1270, 10000):
        try:
            buscarESalvar(i)
            #time.sleep(0.1)  # Atraso de 0,5 segundos entre as requisições
        except Exception as e:
            print(e)