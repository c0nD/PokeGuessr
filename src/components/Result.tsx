import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../data/pokemon';

const Result: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [tries, setTries] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    const storedPokemon = localStorage.getItem('selectedPokemon');
    if (storedPokemon) {
      setSelectedPokemon(JSON.parse(storedPokemon));
    }
    const storedTries = localStorage.getItem('tries');
    if (storedTries) {
      setTries(Number(storedTries));
    }
    const storedBestScore = localStorage.getItem('bestScore');
    if (storedBestScore) {
      setBestScore(Number(storedBestScore));
    }
  }, []);

  const restartGame = () => {
    localStorage.removeItem('tries');  // Reset tries for the new game
    navigate('/');
  };

  const getSpritePath = (name: string) => {
    const url = new URL(`../data/sprites/${name}.png`, import.meta.url).href;
    console.log(url);
    return url;
  };

  return (
    <div className="result">
      <h2>Game Over</h2>
      {selectedPokemon && (
        <>
          <p>The correct Pokémon was {selectedPokemon.name}.</p>
          <img src={getSpritePath(selectedPokemon.name)} alt={selectedPokemon.name} className="img-fluid" />
        </>
      )}
      <p>Tries: {tries}</p>
      {bestScore !== null && <p>Best Score: {bestScore}</p>}
      <button className="btn btn-primary btn-lg" onClick={restartGame}>Play Again</button>
    </div>
  );
};

export default Result;
