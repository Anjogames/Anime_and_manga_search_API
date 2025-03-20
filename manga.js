async function buscarSugestoes() {
    let mangaI = document.getElementById("MangaI").value.trim();

    if (!mangaI) {
        document.getElementById("sugestoes").innerHTML = "";
        return;
    }
    
    let sugestoesDatalist = document.getElementById("sugestoes");

    try {
        const resposta = await axios.get(`https://api.jikan.moe/v4/manga?q=${mangaI}`);

        const mangas = resposta.data.data;

        if (!mangas || mangas.length === 0) {
            sugestoesDatalist.innerHTML = ""; 
            return;
        }
    
        let sugestoesHTML = mangas.slice(0, 5).map((manga) => `
                <option value="${manga.title}">
        `).join("");

        sugestoesDatalist.innerHTML = sugestoesHTML; 

    } catch (erro) {
        console.error("Erro ao buscar manga:", erro);
    }
}

async function buscarManga() {
    let mangaI = document.getElementById("MangaI").value.trim(); 

    if (!mangaI) {
        alert("Por favor, digite um nome de manga!");
        return;
    }

    let resultadosDiv = document.getElementById("resultados");

    if (!resultadosDiv) {
        console.error("Elemento #resultados não encontrado!");
        return;
    }

    try {
        const resposta = await axios.get(`https://api.jikan.moe/v4/manga?q=${mangaI}`);

        const mangas = resposta.data.data;

        if (!mangas || mangas.length === 0) {
            resultadosDiv.innerHTML = "<p>Nenhum manga encontrado.</p>";
            return;
        }
    
        let resultadosHTML = mangas.slice(0, 10).map((manga, index) => `
            <div class="manga-item">
                <h3>${index + 1}. ${manga.title} (${manga.published?.prop?.from?.year || "Ano desconhecido"})</h3>
                <img src="${manga.images.jpg.image_url}" alt="${manga.title}" width="150">
                <p><strong>Sinopse:</strong> ${manga.synopsis ? manga.synopsis.substring(0, 10000) + "..." : "Sem sinopse disponível"}</p>
                <a href="${manga.url}" target="_blank">Ver mais</a>
            </div>
        `).join("");

        resultadosDiv.innerHTML = resultadosHTML; 

    } catch (erro) {
        resultadosDiv.innerHTML = `<p>Erro ao buscar manga: ${erro.message}</p>`;
        console.error("Erro ao buscar manga:", erro);
    }
}

document.getElementById("MangaI").addEventListener("input", buscarSugestoes);
