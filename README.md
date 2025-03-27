# Aplicação de API em consulta no MyAnimeList

Este repositorio compreende um sistema de consultas sobre titulos incluidos no MyAnimeList, sendo estes divididos por animes e mangas, com a pesquisa sendo realizada por seus nomes. O sistema é formado por uma interface em HTML, CSS e JavaScript, que interage com uma API no backend desenvolvida com Axios.


- [Instalação](#instalação)
- [Estrutura do projeto](#estrutura-do-projeto)
- [API](#api)
- [Funcionalidades](#funcionalidades)
- [Ferramentas](#ferramentas)

# Instalação

  1. Criar repositorio e acessa-lo:
      ```
      git clone https://github.com/Anjogames/Anime_and_manga_search_API
      cd Anime_and_manga_search_API
      ```

  2. Instale as dependências:
      ```
      npm install
      ```

## Uso

Para visualizar o projeto, basta abrir os arquivos anime.html ou manga.html em um navegador.

Caso haja um servidor configurado, execute:

  ```
  npm start
  ```
      
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


# Funcionalidades

## anime.js

Este script gerencia a busca e exibição de animes.

- buscarSugestoes(): Obtém sugestões de animes enquanto o usuário digita.
- buscarAnime(): Realiza uma pesquisa na API Jikan e exibe os 10 primeiros resultados, incluindo título, ano, imagem, sinopse e link para mais detalhes.

## manga.js

Este script gerencia a busca e exibição de mangás.

- buscarSugestoes(): Obtém sugestões de mangás enquanto o usuário digita.
- buscarManga(): Realiza uma pesquisa na API Jikan e exibe os 10 primeiros resultados, incluindo título, ano de publicação, imagem, sinopse e link para mais detalhes.

# Ferramentas

## Frontend:

[![HTML](https://img.shields.io/badge/HTML-FF5733?style=for-the-badge&logo=html5&logoColor=ffffff)](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element)

[![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=ffffff)]((https://www.w3schools.com/css/default.asp))

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Backend:
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=ffffff)](https://nodejs.org/pt)

[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=ffffff)](https://axios-http.com/ptbr/docs/intro)

## API
[![Jinkan](https://img.shields.io/badge/Jinkan-121414?style=for-the-badge&labelColor=DBE6FF&color=121414)](https://jikan.moe)



