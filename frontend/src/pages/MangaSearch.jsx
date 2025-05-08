import React, { useState, useEffect } from "react";
import axios from "axios";
import '../style.css';
import { Link } from "react-router-dom";

const Manga = () => {
  const [mangaInput, setMangaInput] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [resultados, setResultados] = useState([]);

  // Buscar sugestões enquanto o usuário digita
  useEffect(() => {
    const buscarSugestoes = async () => {
      if (!mangaInput.trim()) {
        setSugestoes([]);
        return;
      }

      try {
        // Alteração para requisição via servidor local
        const resposta = await axios.get(
          `http://localhost:3000/manga?q=${mangaInput}`
        );
        const mangas = resposta.data.data;
        setSugestoes(mangas.slice(0, 5).map((m) => m.title)); // Exibe até 5 sugestões
      } catch (erro) {
        console.error("Erro ao buscar sugestões:", erro);
      }
    };

    const delay = setTimeout(buscarSugestoes, 400); // debounce leve
    return () => clearTimeout(delay);
  }, [mangaInput]);

  const buscarManga = async () => {
    if (!mangaInput.trim()) {
      alert("Por favor, digite um nome de mangá!");
      return;
    }

    try {
      // Alteração para requisição via servidor local
      const resposta = await axios.get(
        `http://localhost:3000/manga?q=${mangaInput}`
      );
      const mangas = resposta.data.data;
      setResultados(mangas.slice(0, 10)); // Exibe até 10 resultados
    } catch (erro) {
      console.error("Erro ao buscar mangá:", erro);
      setResultados([]);
    }
  };

  return (
    <>
      {/* Menu */}
      <header className="menu">
        <nav>
          <div className="fundo_menu">
            <ul className="menu_item">
              <li><Link to="/AnimeSearch">Anime</Link></li>
              <li><Link to="/MangaSearch">Manga</Link></li>
              <li><Link to="/QuizGame">Quiz</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Estrutura principal */}
      <div className="estrutura">
        <input
          className="pesquisa"
          type="search"
          list="sugestoes"
          placeholder="Digite um mangá..."
          value={mangaInput}
          onChange={(e) => setMangaInput(e.target.value)}
        />
        <datalist id="sugestoes">
          {sugestoes.map((sugestao, index) => (
            <option key={index} value={sugestao} />
          ))}
        </datalist>

        <button className="pesquisa" onClick={buscarManga}>
          Buscar
        </button>

        <div id="resultados">
          {resultados.length === 0 && mangaInput && (
            <p>Nenhum mangá encontrado.</p>
          )}

          {resultados.map((manga, index) => (
            <div className="manga-item" key={manga.mal_id}>
              <img
                src={manga.images?.jpg?.image_url}
                alt={manga.title}
                width="150"
              />
              <div>
                <h3>{index + 1}. {manga.title} ({manga.year || "N/A"})</h3>
                <p><strong>Nota:</strong> {manga.score || "N/A"}</p>
                <p><strong>Tipo:</strong> {manga.type || "N/A"} ({manga.chapters || "N/A"})</p>
                <p><strong>Sinopse:</strong> {manga.synopsis ? manga.synopsis.substring(0, 100) + "..." : "Sem sinopse disponível"}</p>
                <a href={manga.url} target="_blank" rel="noreferrer">Ver mais</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Manga;
