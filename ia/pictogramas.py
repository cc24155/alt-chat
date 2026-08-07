import requests

import requests

class Pictograma:
    def __init__(self, id_pic: int = None):
        # Variáveis/Atributos da classe
        self.id = id_pic
        self.palavra = ""
        self.classe_gramatical = ""

    def buscar_dados(self):
        if self.id is None:
            raise ValueError("Um ID precisa ser fornecido para buscar o pictograma.")

        url = f'https://api.arasaac.org/api/pictograms/{self.id}'
        resposta = requests.get(url)

        if resposta.status_code != 200:
            print(f"Erro ao buscar pictograma {self.id}: HTTP {resposta.status_code}")
            return False

        json_data = resposta.json()
        palavras = json_data.get("keywords", [])

        if palavras:
            self.palavra = palavras[0].get("keyword", "")
            tipo_gramatical_numero = palavras[0].get("type")
        else:
            self.palavra = ""
            tipo_gramatical_numero = None

        # Verificação da classe gramatical (números corrigidos da ARASAAC)
        if tipo_gramatical_numero is not None:
            match tipo_gramatical_numero:
                case 1:
                    self.classe_gramatical = "pronome"
                case 2:
                    self.classe_gramatical = "verbo"       # 2 é Verbo!
                case 3:
                    self.classe_gramatical = "substantivo" # 3 é Substantivo!
                case 4:
                    self.classe_gramatical = "adjetivo"
                case 5:
                    self.classe_gramatical = "interjeição"
                case 6:
                    self.classe_gramatical = "preposição"
                case _:
                    self.classe_gramatical = "outros"
        else:
            self.classe_gramatical = "desconhecido"

        return True