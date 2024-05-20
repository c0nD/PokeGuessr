import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../data/pokemon';

const Result: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const storedPokemon = localStorage.getItem('selectedPokemon');
    if (storedPokemon) {
      setSelectedPokemon(JSON.parse(storedPokemon));
    }
  }, []);

  const restartGame = () => {
    navigate('/');
  };

  const sanitizeInput = (input: string): string => {
    return input.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const getSpritePath = (name: string) => {
    const url = new URL(`../data/sprites/${(name)}.png`, import.meta.url).href;
    console.log(url)
    return url
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
      <button className="btn btn-primary btn-lg" onClick={restartGame}>Play Again</button>
    </div>
  );
};

export default Result;
