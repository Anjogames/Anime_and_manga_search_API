import './App.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Manga from "./pages/MangaSearch";
import Anime from "./pages/AnimeSearch";
import QuizGame from "./pages/QuizGame";
import './style.css';

function App() {
  const [results, setResults] = useState([]);
  const [mangaResults, setMangaResults] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const tiposAnime = ["tv", "ova"];
  const tipos2Anime = ["tv_special", "movie", "ona"];
  const tiposManga = ["manga", "novel", "manhua", "manhwa", "lightnovel"];

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarPaginas = async (style, tipos, n) => {
    const resultados = [];
    for (const tipo of tipos) {
      for (let page = 1; page <= n; page++) {
        const resposta = await axios.get(`https://api.jikan.moe/v4/top/${style}?type=${tipo}&order_by=score&sort=desc&page=${page}`);
        resultados.push(...resposta.data.data);
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Delay de 1.5s entre as requisições
      }
    }
    return resultados;
  };

  const buscarDados = async () => {
    setCarregando(true);
    try {
      const animeParte1 = await buscarPaginas("anime", tiposAnime, 3);
      const animeParte2 = await buscarPaginas("anime", tipos2Anime, 2);
      const mangaData = await buscarPaginas("manga", tiposManga, 2);

      const todosAnimes = [...animeParte1, ...animeParte2];
      const unicosAnimes = filtrarUnicos(todosAnimes);
      const ordenadosAnimes = ordenarPorScore(unicosAnimes).slice(0, 100);
      setResults(ordenadosAnimes);

      const unicosMangas = filtrarUnicos(mangaData);
      const ordenadosMangas = ordenarPorScore(unicosMangas).slice(0, 100);
      setMangaResults(ordenadosMangas);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  const filtrarUnicos = (lista) => {
    const vistos = new Set();
    return lista.filter((item) => {
      if (vistos.has(item.mal_id)) return false;
      vistos.add(item.mal_id);
      return true;
    });
  };

  const ordenarPorScore = (lista) => {
    return lista.sort((a, b) => b.score - a.score);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/AnimeSearch" />} />
        <Route path="/AnimeSearch" element={<Anime />} />
        <Route path="/MangaSearch" element={<Manga />} />
        <Route path="/QuizGame" element={<QuizGame results={results} mangaResults={mangaResults} carregando={carregando} />} />
      </Routes>
    </Router>
  );
}

export default App;
