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

  return (
    <div className="result">
      <h2>Game Over</h2>
      {selectedPokemon && (
        <>
          <p>The correct Pokémon was {selectedPokemon.name}.</p>
          <img src={require(`../sprites/${selectedPokemon.name.toLowerCase()}.png`).default} alt={selectedPokemon.name} className="img-fluid" />
        </>
      )}
      <button className="btn btn-primary btn-lg" onClick={restartGame}>Play Again</button>
    </div>
  );
};

export default Result;
