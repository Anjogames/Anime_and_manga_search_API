async function buscarSugestoes() {
    let animeI = document.getElementById("AnimeI").value.trim();

    if (!animeI) {
        document.getElementById("sugestoes").innerHTML = "";
        return;
    }
    
    let sugestoesDatalist = document.getElementById("sugestoes");

    try {
        const resposta = await axios.get(`https://api.jikan.moe/v4/anime?q=${animeI}`);

        console.log(resposta); 

        const animes = resposta.data.data;

        if (!animes || animes.length === 0) {
            resultadosDiv.innerHTML = "";
            return;
        }

        let sugestoesHTML = animes.slice(0, 5).map((anime) => `
                <option value="${anime.title}">
        `).join("");

        sugestoesDatalist.innerHTML = sugestoesHTML;

    } catch (erro) {
        console.error("Erro ao buscar anime:", erro);
        }   
}


async function buscarAnime() {
    let animeI = document.getElementById("AnimeI").value.trim();

    if (!animeI) {
        alert("Por favor, digite um nome de anime!");
        return;
    }

    let resultadosDiv = document.getElementById("resultados");

    if (!resultadosDiv) {
        console.error("Elemento #resultados não encontrado!");
        return;
    }

    try {
        const resposta = await axios.get(`https://api.jikan.moe/v4/anime?q=${animeI}`);

        console.log(resposta); 

        const animes = resposta.data.data;

        if (!animes || animes.length === 0) {
            resultadosDiv.innerHTML = "<p>Nenhum anime encontrado.</p>";
            return;
        }

        let resultadosHTML = animes.slice(0, 10).map((anime, index) => `
            <div class="anime-item">
                <h3>${index + 1}. ${anime.title} (${anime.year || "Ano desconhecido"})</h3>
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}" width="150">
                <p><strong>Sinopse:</strong> ${anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "Sem sinopse disponível"}</p>
                <a href="${anime.url}" target="_blank">Ver mais</a>
            </div>
        `).join("");

        resultadosDiv.innerHTML = resultadosHTML;

    } catch (erro) {
        resultadosDiv.innerHTML = `<p>Erro ao buscar anime: ${erro.message}</p>`;
        console.error("Erro ao buscar anime:", erro);
    }
}

document.getElementById("AnimeI").addEventListener("input", buscarSugestoes);