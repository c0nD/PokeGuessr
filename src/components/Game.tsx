import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pokemonData, Pokemon } from '../data/pokemon';
import Hint from './Hint';

interface GuessLog {
  guess: string;
  hints: string[];
}

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPokemon] = useState<Pokemon>(pokemonData[Math.floor(Math.random() * pokemonData.length)]);
  const [guess, setGuess] = useState<string>('');
  const [hints, setHints] = useState<string[]>([]);
  const [guessLog, setGuessLog] = useState<GuessLog[]>([]);
  const [tries, setTries] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    const storedBestScore = localStorage.getItem('bestScore');
    if (storedBestScore) {
      setBestScore(Number(storedBestScore));
    }
  }, []);

  const sanitizeInput = (input: string): string => {
    return input.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const handleGuess = () => {
    const sanitizedGuess = sanitizeInput(guess);
    const newHints = generateHint(sanitizedGuess);
    setGuessLog([{ guess, hints: newHints }, ...guessLog]);
    setHints(newHints);
    setTries(tries + 1);
    if (sanitizeInput(selectedPokemon.name) === sanitizedGuess) {
      finishGame(true);
    } else {
      setGuess('');
    }
  };

  const compareTypes = (type1: string, type2: string) => {
    const types1 = type1.split('/');
    const types2 = type2.split('/');
    const commonTypes = types1.filter(type => types2.includes(type));
    if (commonTypes.length === 2) return 'Correct Type';
    if (commonTypes.length === 1) return 'Partially Correct Type';
    return 'Wrong Type';
  };

  const generateHint = (guess: string): string[] => {
    const guessedPokemon = pokemonData.find(p => sanitizeInput(p.name) === guess);
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

      return [typeHint, generationHint, weightHint, heightHint, legendaryHint];
    } else {
      return ['Invalid Pokémon Name'];
    }
  };

  const finishGame = (completed: boolean) => {
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
    localStorage.setItem('tries', tries.toString());
    if (completed) {
      if (bestScore === null || tries < bestScore) {
        localStorage.setItem('bestScore', tries.toString());
        setBestScore(tries);
      }
    }
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
      <button className="btn btn-danger" onClick={() => finishGame(false)}>Finish Game</button>

      <div className="guess-log">
        <h3>Guess Log</h3>
        {guessLog.map((log, index) => (
          <div key={index} className="log-entry">
            <p><strong>Guess:</strong> {log.guess}</p>
            <div className="hints">
              {log.hints.map((hint, hintIndex) => <Hint key={hintIndex} hint={hint} />)}
            </div>
          </div>
        ))}
      </div>

      <div className="score-board">
        <p>Tries: {tries}</p>
        {bestScore !== null && <p>Best Score: {bestScore}</p>}
      </div>
    </div>
  );
};

export default Game;
