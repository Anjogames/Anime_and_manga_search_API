# 



# Aplicção de API em consulta no MyAnimeList

Este repositorio compreende um sistema de consultas sobre titulos incluidos no MyAnimeList, sendo estes divididos por animes e mangas, com a pesquisa sendo realizada por seus nomes. O sistema é formado por uma interface em HTML, CSS e JavaScript, que interage com uma API no backend desenvolvida com Express e Axios.

- [Sobre](#sobre)
- [Instalação](#instalação)
- [API](#API)
- [Funcionalidades](#Funcionalidades)
- [Ferramentas](#licença)
- [Contribuição](#contribuição)

# Instalação

Clone este repositório:

git clone https://github.com/seuusuario/suapasta.git

Acesse a pasta do projeto:

cd suapasta

Instale as dependências:

npm install

Uso

Para visualizar o projeto, basta abrir os arquivos anime.html ou manga.html em um navegador.

Caso haja um servidor configurado, execute:

npm start

# Estrutura do Projeto

  ```bash
  seurepositorio/
  ├── anime.html        # Página sobre animes
  ├── manga.html        # Página sobre mangás
  ├── anime.js          # Script JS para anime.html
  ├── manga.js          # Script JS para manga.html
  ├── style.css         # Estilos da página
  ├── package.json      # Configuração do projeto Node.js
  ├── package-lock.json # Controle de versões de pacotes
  └── node_modules/     # Dependências instaladas
  ```


# API 

Este projeto utiliza a API Jikan, um wrapper não oficial para o MyAnimeList, permitindo buscar informações detalhadas sobre animes e mangás.

Para mais detalhes sobre os endpoints disponíveis, consulte a documentação oficial da jinkan API.


# Fucionalidades

## anime.js

Este script gerencia a busca e exibição de animes.

- buscarSugestoes(): Obtém sugestões de animes enquanto o usuário digita.
- buscarAnime(): Realiza uma pesquisa na API Jikan e exibe os 10 primeiros resultados, incluindo título, ano, imagem, sinopse e link para mais detalhes.

## manga.js

Este script gerencia a busca e exibição de mangás.

- buscarSugestoes(): Obtém sugestões de mangás enquanto o usuário digita.
- buscarManga(): Realiza uma pesquisa na API Jikan e exibe os 10 primeiros resultados, incluindo título, ano de publicação, imagem, sinopse e link para mais detalhes.

# Ferramentas




## API
[![Jinkan](https://img.shields.io/badge/Jinkan-121414?style=for-the-badge&labelColor=DBE6FF&color=121414)(https://jikan.moe)]



