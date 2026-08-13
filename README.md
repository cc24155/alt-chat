<div align="center">
  
# alt-chat
*Comunicação Aumentativa e Alternativa (CAA) • Suporte de Inteligência Artificial • Não-Verbais*

![last-commit](https://img.shields.io/github/last-commit/cc24155/alt-chat?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/cc24155/alt-chat?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/cc24155/alt-chat?style=flat&color=0080ff)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![COTUCA - UNICAMP](https://img.shields.io/badge/COTUCA-UNICAMP_2026-red.svg)](https://www.cotuca.unicamp.br/)

</div>

### 📌 Sobre a Plataforma

O **ALT-CHAT** é uma plataforma digital de Comunicação Aumentativa e Alternativa (CAA) desenvolvida como Trabalho de Conclusão de Curso (TCC) no Colégio Técnico de Campinas (COTUCA/UNICAMP). O projeto busca superar as limitações das soluções físicas tradicionalmente utilizadas, como as pranchas impressas de pictogramas, que são pouco adaptáveis, de alto custo e de difícil transporte, oferecendo, em seu lugar, uma interface baseada em pictogramas, organizada por categorias, e um sistema de sugestão inteligente que aprende o padrão de uso de cada pessoa para prever os próximos pictogramas mais prováveis.

O projeto visa empoderar pessoas não-verbais (como indivíduos no Espectro Autista - TEA ou com sequelas neurológicas) oferecendo uma ferramenta 100% gratuita, moderna e personalizável. O principal diferencial é a utilização de **Inteligência Artificial Preditiva**, que calcula contexto, ordem sintática e padrões de uso do usuário para sugerir os próximos pictogramas, reduzindo o tempo necessário para a construção de frases.

*Construído com as seguintes tecnologias:*

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.10+-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)

---

## 📚 Índice

- [Visão Geral](#visao-geral)
  - [Integrantes e Orientação](#integrantes-e-orientacao)
  - [Figma Prototype](#figma-prototype)
- [Para Uso](#para-uso)
  - [Estrutura do repositório](#estrutura-do-repositorio)
  - [Pré-requisitos](#pré-requisitos)

---

## 🧠 Visão Geral

O ALT-CHAT é uma plataforma digital de Comunicação Aumentativa e Alternativa (CAA) desenvolvida para transformar a autonomia de pessoas não-verbais, como indivíduos no Espectro Autista (TEA) ou com sequelas neurológicas. A plataforma resolve um dos maiores desafios do uso de cartões e pranchas tradicionais: a lentidão no processo de construção de frases. Para superá-lo, o sistema integra um motor de Inteligência Artificial Preditiva que analisa a ordem sintática da frase, o horário do dia e o histórico individual de uso, sugerindo os pictogramas mais prováveis e reduzindo o tempo de comunicação em pelo menos 30%.

### 🛠️ Integrantes e Orientação
* **Mariana Marietti da Costa** 
* **Rafaelly Maria Nascimento da Silva** 
* **Samuel Rosa Parra** 
* **Orientadora:** Prof.ª Andreia Cristina de Souza

### 🎨 Figma Prototype:
[![alt-chat](docs/design/Thumbnail%20Landing.png)](https://www.figma.com/proto/a7RZmp1F4STSdeImv5ZA19/alt-chat?node-id=26-1462&p=f&t=wRPZDiPusXWNTNeO-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=26%3A1462&show-proto-sidebar=1)
(Clique para abrir o prototipo)

---

## ⚙️ Para Uso

### 🏗️ Estrutura do Repositório

```text
cc24155-alt-chat/
├── docs/                 # Documentação do projeto
│   ├── design/           # Design do projeto no figma
│   └── modelagem/        # Modelagem da plataforma e banco de dados
├── ia/                   # API FastAPI em Python e Algoritmo Preditivo
│   ├── ia.py             # Servidor e rotas da IA (/sugerir)
│   ├── sugestor.py       # Algoritmo de sugestão de pictogramas
│   └── pictogramas.py    # Integração com a API ARASAAC
├── react/                # Interface Frontend desenvolvida em Next.js (App Router)
│   ├── app/              # Páginas e rotas (Biblioteca, Aprendizado, Relatório, etc.)
│   ├── arasaac api/      # Consumo da API de pictogramas
│   └── lib/              # Configurações do Supabase
└── package.json          # Dependências globais do projeto
```

### 💿 Pré-requisitos

Certifique-se de ter instalado:

``npm install``

``npm install @supabase/supabase-js``

E então:

``npm run dev``

python -m pip install fastapi uvicorn pydantic

Para rodar a API da IA:

``python -m uvicorn ia.ia:app --reload --host 127.0.0.1 --port 8000``

---

⬆ [Voltar ao topo](#alt-chat)
