import React, { useState, useRef } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

export default function QuizGame({ results, mangaResults, carregando }) {
  const [quizAtivo, setQuizAtivo] = useState(false);
  const [indiceQuiz, setIndiceQuiz] = useState(0);
  const [opcoes, setOpcoes] = useState([]);
  const [pontuacao, setPontuacao] = useState(0);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [venceu, setVenceu] = useState(false);
  const [isAnime, setIsAnime] = useState(true);
  const [quizAtual, setQuizAtual] = useState(null);
  const [isScoreQuiz, setIsScoreQuiz] = useState(false);

  const [itensComparacao, setItensComparacao] = useState([]);
  const [opcoesComparacao, setOpcoesComparacao] = useState([]);
  const [respostasUsuario, setRespostasUsuario] = useState({});
  const [modoComparacao, setModoComparacao] = useState(false);
  const [respondeuComparacao, setRespondeuComparacao] = useState(false);
  const [indiceComparacao, setIndiceComparacao] = useState(0);
  const [pontuacaoComparacao, setPontuacaoComparacao] = useState(0);
  const usadosComparacao = useRef(new Set());

  const [respostaCertaIdx, setRespostaCertaIdx] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);

  const iniciarQuizSinopse = () => {
    setIsScoreQuiz(false);
    setQuizAtivo(true);
    setIndiceQuiz(0);
    setPontuacao(0);
    setFimDeJogo(false);
    setVenceu(false);
    setQuizAtual(null);
    setTimeout(() => gerarPerguntaSinopse(), 0);
  };

  const iniciarQuizScore = () => {
    setIsScoreQuiz(true);
    setQuizAtivo(true);
    setIndiceQuiz(0);
    setPontuacao(0);
    setFimDeJogo(false);
    setVenceu(false);
    setQuizAtual(null);
    setTimeout(() => gerarPerguntaScore(), 0);
  };

  const gerarPerguntaSinopse = () => {
    const fonte = isAnime ? results : mangaResults;
    const pergunta = fonte[Math.floor(Math.random() * fonte.length)];
    const opcoesErradas = fonte.filter(item => item.mal_id !== pergunta.mal_id).sort(() => 0.5 - Math.random()).slice(0, 3);
    const todasOpcoes = [...opcoesErradas, pergunta].sort(() => 0.5 - Math.random());
    setOpcoes(todasOpcoes.map(op => ({ ...op, correta: op.mal_id === pergunta.mal_id })));
    setQuizAtual(pergunta);
    setRespostaCertaIdx(null);
    setBloqueado(false);
  };

  const gerarPerguntaScore = () => {
    const fonte = isAnime ? results : mangaResults;
    const pergunta = fonte[Math.floor(Math.random() * fonte.length)];
    const respostaCorreta = parseFloat(pergunta.score?.toFixed(2));
    let opcoesNumericas = new Set();
    while (opcoesNumericas.size < 3) {
      let variacao = parseFloat((Math.random() * 1.6 - 0.8).toFixed(2));
      let valor = parseFloat((respostaCorreta + variacao).toFixed(2));
      if (valor !== respostaCorreta && valor <= 10 && valor < respostaCorreta + 0.8 && valor > 0) {
        opcoesNumericas.add(valor.toFixed(2));
      }
    }
    const todasOpcoes = [...opcoesNumericas, respostaCorreta.toFixed(2)].sort(() => 0.5 - Math.random()).map(valor => ({
      title: valor,
      correta: parseFloat(valor) === respostaCorreta
    }));
    setOpcoes(todasOpcoes);
    setQuizAtual(pergunta);
    setRespostaCertaIdx(null);
    setBloqueado(false);
  };

  const iniciarComparacaoMaisBemAvaliados = () => {
    setModoComparacao(true);
    setQuizAtivo(false);
    setIndiceComparacao(0);
    setPontuacaoComparacao(0);
    usadosComparacao.current.clear();
    gerarNovaComparacao();
  };

  const gerarNovaComparacao = () => {
    const fonte = (isAnime ? results : mangaResults).filter(item => !usadosComparacao.current.has(item.mal_id));
    if (fonte.length < 2) {
      setFimDeJogo(true);
      setVenceu(pontuacaoComparacao === 5);
      return;
    }
    const comparacao = [...fonte].sort(() => 0.5 - Math.random()).slice(0, 2);
    comparacao.forEach(item => usadosComparacao.current.add(item.mal_id));
    const opcoes = comparacao.map(item => item.title).sort(() => 0.5 - Math.random());
    setItensComparacao(comparacao);
    setOpcoesComparacao(opcoes);
    setRespondeuComparacao(false);
  };

  const handleRespostaComparacao = (tituloSelecionado) => {
    const [item1, item2] = itensComparacao;
    const respostaCerta = item1.score >= item2.score ? item1.title : item2.title;
    if (tituloSelecionado === respostaCerta) {
      setPontuacaoComparacao(p => p + 1);
    }
    setRespondeuComparacao(true);
  };

  const proximaComparacao = () => {
    if (indiceComparacao + 1 >= 5) {
      setFimDeJogo(true);
      setVenceu(pontuacaoComparacao + 1 === 5);
    } else {
      setIndiceComparacao(i => i + 1);
      gerarNovaComparacao();
    }
  };

  const verificarResposta = (resposta, idx) => {
    if (bloqueado) return;
    setBloqueado(true);
    const acertou = resposta.correta;
    if (acertou) setPontuacao(p => p + 1);
    const idxCerto = opcoes.findIndex(op => op.correta);
    setRespostaCertaIdx(idxCerto);
    setTimeout(() => {
      if (indiceQuiz + 1 >= 5) {
        setFimDeJogo(true);
        setVenceu(acertou && pontuacao + 1 === 5);
      } else {
        setIndiceQuiz(i => i + 1);
        isScoreQuiz ? gerarPerguntaScore() : gerarPerguntaSinopse();
      }
    }, 3000);
  };

  const reiniciar = () => {
    setQuizAtivo(false);
    setIndiceQuiz(0);
    setPontuacao(0);
    setFimDeJogo(false);
    setVenceu(false);
    setQuizAtual(null);
    setIsScoreQuiz(false);
    setModoComparacao(false);
    setIndiceComparacao(0);
    setPontuacaoComparacao(0);
    usadosComparacao.current.clear();
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
        <h2>Quiz Game</h2>

        {carregando && <p>Carregando dados...</p>}

        {!quizAtivo && !carregando && !modoComparacao && (
          <div className="game">
            <button onClick={() => setIsAnime(true)} disabled={carregando || results.length === 0}>Anime</button>
            <button onClick={() => setIsAnime(false)} disabled={carregando || mangaResults.length === 0}>Manga</button>
            <br />
            <button onClick={iniciarQuizSinopse} disabled={carregando}>Quiz Sinopse</button>
            <button onClick={iniciarQuizScore} disabled={carregando}>Quiz de score</button>
            <button onClick={iniciarComparacaoMaisBemAvaliados} disabled={carregando}>Quiz dos +avaliados</button>
          </div>
        )}

        {modoComparacao && !fimDeJogo && (
          <div className="estrutura">
            <h2 className='title'>Rodada {indiceComparacao + 1} de 5</h2>
            <p>Qual dos dois tem a nota mais alta?</p>
            <div className="comparacao-box">
              {itensComparacao.map((item, index) => (
                <div className="quiz-unico-container" key={index}>
                  <img src={item.images?.jpg?.image_url} alt={item.title} />
                  <button className="titulo-button" onClick={() => handleRespostaComparacao(item.title)}>
                    {item.title}
                  </button>
                </div>
              ))}
            </div>
            {respondeuComparacao && (
              <button className="titulo-button2" onClick={proximaComparacao}>
                Próxima
              </button>
            )}
          </div>
        )}

        {quizAtivo && !fimDeJogo && quizAtual && (
          <div className="quiz">
            <p><strong>Rodada {indiceQuiz + 1} de 5</strong></p>
            {isScoreQuiz ? (
              <div>
                <h3>{quizAtual.title}</h3>
                {quizAtual.images?.jpg?.image_url && (
                  <img src={quizAtual.images.jpg.image_url} alt={quizAtual.title} style={{ maxWidth: '200px' }} />
                )}
                <p>Qual é a nota (score) deste {isAnime ? 'anime' : 'mangá'}?</p>
              </div>
            ) : (
              <p>{quizAtual.synopsis}</p>
            )}
            <div className="opcoes">
              {opcoes.map((op, idx) => (
                <button
                  key={idx}
                  onClick={() => verificarResposta(op, idx)}
                  style={respostaCertaIdx === idx ? { backgroundColor: 'lightgreen' } : {}}
                >
                  {op.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {fimDeJogo && (
          <div className="resultado-final">
            {venceu ? (
              <h2>🎉 Parabéns! Você acertou todas as respostas!</h2>
            ) : (
              <h2>❌ Que pena! Você errou algumas respostas!</h2>
            )}
            <h3>Acertos: {isScoreQuiz ? pontuacao : (modoComparacao ? pontuacaoComparacao : pontuacao)}</h3>
            <button onClick={reiniciar}>Reiniciar</button>
          </div>
        )}
      </div>
    </>
  );
}
