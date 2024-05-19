import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pokemonData, Pokemon } from "../data/pokemon";
import Hint from "./Hint";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(
    pokemonData[Math.floor(Math.random() * pokemonData.length)]
  );
  const [guess, setGuess] = useState<string>("");
  const [hints, setHints] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);

  const handleGuess = () => {
    setGuesses([...guesses, guess]);
    generateHint(guess);
    setGuess("");
  };

  const generateHint = (guess: string) => {
    const guessedPokemon = pokemonData.find(
      (p) => p.name.toLowerCase() === guess.toLowerCase()
    );
    if (guessedPokemon) {
      const typeHint =
        guessedPokemon.type === selectedPokemon.type
          ? "Correct Type"
          : "Wrong Type";
      const generationHint =
        guessedPokemon.generation === selectedPokemon.generation
          ? "Correct Generation"
          : guessedPokemon.generation < selectedPokemon.generation
          ? "Higher Generation"
          : "Lower Generation";
      setHints([typeHint, generationHint]);
    } else {
      setHints(["Invalid Pokémon Name"]);
    }
  };

  const finishGame = () => {
    // Store the selected Pokémon in the local storage to access it in the Result component
    localStorage.setItem("selectedPokemon", JSON.stringify(selectedPokemon));
    navigate("/result");
  };

  return (
    <div className="game">
      <h2>Guess the Pokémon</h2>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <button className="btn btn-success" onClick={handleGuess}>
        Submit Guess
      </button>
      <div className="hints">
        {hints.map((hint, index) => (
          <Hint key={index} hint={hint} />
        ))}
      </div>
      <button className="btn btn-danger" onClick={finishGame}>
        Finish Game
      </button>
    </div>
  );
};

export default Game;
