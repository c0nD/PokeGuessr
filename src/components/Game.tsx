import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pokemonData, Pokemon } from '../data/pokemon';
import Hint from './Hint';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPokemon] = useState<Pokemon>(pokemonData[Math.floor(Math.random() * pokemonData.length)]);
  const [guess, setGuess] = useState<string>('');
  const [hints, setHints] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);

  const handleGuess = () => {
    setGuesses([...guesses, guess]);
    generateHint(guess);
    setGuess('');
  };

  const compareTypes = (type1: string, type2: string) => {
    const types1 = type1.split('/');
    const types2 = type2.split('/');
    const commonTypes = types1.filter(type => types2.includes(type));
    if (commonTypes.length === 2) return 'Correct Type';
    if (commonTypes.length === 1) return 'Partially Correct Type';
    return 'Wrong Type';
  };

  const generateHint = (guess: string) => {
    const guessedPokemon = pokemonData.find(p => p.name.toLowerCase() === guess.toLowerCase());
    if (guessedPokemon) {
      const typeHint = compareTypes(guessedPokemon.type, selectedPokemon.type);
      const generationHint = guessedPokemon.generation === selectedPokemon.generation
        ? 'Correct Generation'
        : Math.abs(guessedPokemon.generation - selectedPokemon.generation) <= 1
        ? 'Close Generation'
        : 'Wrong Generation';
      const weightHint = guessedPokemon.weight === selectedPokemon.weight
        ? 'Correct Weight'
        : Math.abs(guessedPokemon.weight - selectedPokemon.weight) <= 10
        ? 'Close Weight'
        : 'Wrong Weight';
      const heightHint = guessedPokemon.height === selectedPokemon.height
        ? 'Correct Height'
        : Math.abs(guessedPokemon.height - selectedPokemon.height) <= 0.5
        ? 'Close Height'
        : 'Wrong Height';
      const legendaryHint = guessedPokemon.isLegendary === selectedPokemon.isLegendary ? 'Correct Legendary Status' : 'Wrong Legendary Status';

      setHints([typeHint, generationHint, weightHint, heightHint, legendaryHint]);
    } else {
      setHints(['Invalid Pokémon Name']);
    }
  };

  const finishGame = () => {
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
    navigate('/result');
  };

  return (
    <div className="game">
      <h2>Guess the Pokémon</h2>
      <input
        type="text"
        className="form-control"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <button className="btn btn-success" onClick={handleGuess}>Submit Guess</button>
      <div className="hints">
        {hints.map((hint, index) => <Hint key={index} hint={hint} />)}
      </div>
      <button className="btn btn-danger" onClick={finishGame}>Finish Game</button>
    </div>
  );
};

export default Game;
