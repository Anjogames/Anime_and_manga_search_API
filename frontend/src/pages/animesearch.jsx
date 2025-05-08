import { useState, useEffect } from "react";
import axios from "axios";
import '../style.css';
import { Link } from "react-router-dom";

export default function AnimeSearch() {
    const [animeQuery, setAnimeQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!animeQuery) {
            setSuggestions([]);
            return;
        }
        const fetchSuggestions = async () => {
            try {
                // Faz a requisição para o servidor local (server.js)
                const response = await axios.get(`http://localhost:3000/anime?q=${animeQuery}`);
                setSuggestions(response.data.data.slice(0, 5)); // Mostra até 5 sugestões
            } catch (error) {
                console.error("Erro ao buscar sugestões:", error);
            }
        };
        fetchSuggestions();
    }, [animeQuery]);

    const buscarAnime = async () => {
        if (!animeQuery) {
            alert("Por favor, digite um nome de anime!");
            return;
        }
        try {
            // Faz a requisição para o servidor local (server.js)
            const response = await axios.get(`http://localhost:3000/anime?q=${animeQuery}`);
            setResults(response.data.data.slice(0, 10)); // Mostra até 10 resultados
        } catch (error) {
            console.error("Erro ao buscar anime:", error);
            setResults([]);
        }
    };

    return (
        <>
            <div className="menu">
                <div className="fundo_menu">
                    <ul className="menu_item">
                        <li><Link to="/AnimeSearch">Anime</Link></li>
                        <li><Link to="/MangaSearch">Manga</Link></li>
                        <li><Link to="/QuizGame">Quiz</Link></li>
                    </ul>
                </div>
            </div>

            <div className="estrutura">
                <input
                    type="search"
                    value={animeQuery}
                    onChange={(e) => setAnimeQuery(e.target.value)}
                    list="sugestoes"
                    className="pesquisa"
                    placeholder="Digite um anime..."
                />
                <datalist id="sugestoes">
                    {suggestions.map((anime) => (
                        <option key={anime.mal_id} value={anime.title} />
                    ))}
                </datalist>

                <button onClick={buscarAnime} className="pesquisa">Buscar</button>

                <div id="resultados">
                    {results.length === 0 && animeQuery && <p>Nenhum anime encontrado.</p>}
                    {results.map((anime, index) => (
                        <div key={anime.mal_id} className="anime-item">
                            <img src={anime.images.jpg.image_url} alt={anime.title} />
                            <div>
                                <h3>{index + 1}. {anime.title} ({anime.year || "N/A"})</h3>
                                <p><strong>Nota:</strong> {anime.score || "N/A"}</p>
                                <p><strong>Tipo:</strong> {anime.type || "N/A"} ({anime.episodes || "N/A"})</p>
                                <p><strong>Sinopse:</strong> {anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "Sem sinopse disponível"}</p>
                                <a href={anime.url} target="_blank" rel="noreferrer">Ver mais</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
