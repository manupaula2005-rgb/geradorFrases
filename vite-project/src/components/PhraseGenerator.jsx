import { useState } from "react";
import Phrase from "./Phrase";
import axios from "axios";

function PhraseGenerator() {
  const [phrase, setPhrase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const getRandomPhrase = async () => {
  try {
    setLoading(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const resposta = await axios.get("https://dummyjson.com/quotes/random");
    const data = resposta.data;
    
    setPhrase({
      quote: data.quote,
      author: data.author,
    });
  } catch (err) {
    setError("Erro ao buscar frase. Tente novamente!");
    console.error("Erro ao buscar frase", err);
    setPhrase(null);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-20 flex items-center justify-center">
        <img src="https://media1.tenor.com/m/3gr9u8zdTzUAAAAd/cat-loading-hgb.gif" alt="Carregando..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-20 flex flex-col gap-4 items-start">
        <p className="text-lg text-red-500">{error}</p>
        <button onClick={getRandomPhrase} className="border p-2 rounded">Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="min-h-20 flex flex-col gap-4 items-start">
      {phrase && <Phrase text={phrase.quote} author={phrase.author} />}

      <button onClick={getRandomPhrase} className="border p-2 rounded">
        Generate random phrase
      </button>
    </div>
  );
}

export default PhraseGenerator;
