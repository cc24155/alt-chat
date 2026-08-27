import time
from supabase import create_client, Client
from pictogramas import Pictograma

urlSupabase = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

if not urlSupabase or not key:
    raise RuntimeError("SUPABASE_URL and SUPABASE_KEY must be set in environment")

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
