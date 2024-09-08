import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pokemonData, Pokemon } from "../data/pokemon";
import Hint from "./Hint";

interface GuessLog {
  guess: string;
  hints: string[];
}

const Game: React.FC = () => {
  const { mode } = useParams<{ mode: "infinity" | "daily" }>();
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [guess, setGuess] = useState<string>("");
  const [hints, setHints] = useState<string[]>([]);
  const [guessLog, setGuessLog] = useState<GuessLog[]>([]);
  const [tries, setTries] = useState<number>(1);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    if (mode === "daily") {
      const dailyPokemon = getDailyPokemon();
      setSelectedPokemon(dailyPokemon);
    } else {
      setSelectedPokemon(
        pokemonData[Math.floor(Math.random() * pokemonData.length)]
      );
    }
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) {
      setBestScore(Number(storedBestScore));
    }
  }, [mode]);

  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % 1000000007;
    }
    return hash;
  };

  const getDailyPokemon = () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;

    const hash = hashCode(dateString);
    const shuffledPokemonData = shuffleArray(pokemonData, hash);
    return shuffledPokemonData[0];
  };

  // Shuffle array function using Fisher-Yates algorithm
  const shuffleArray = (array: Pokemon[], seed: number): Pokemon[] => {
    const shuffledArray = array.slice();
    const random = seedRandom(seed);

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  };

  // Seedable random generator (Mulberry32 algorithm)
  const seedRandom = (seed: number) => {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const sanitizeInput = (input: string): string => {
    return input.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  const handleGuess = () => {
    const sanitizedGuess = sanitizeInput(guess);
    const guessedPokemon = pokemonData.find(
      (p) => sanitizeInput(p.name) === sanitizedGuess
    );
  
    if (!guessedPokemon) {
      setGuess("");
      alert("Pokémon not found. Please check your spelling and try again.");
      return;
    }
  
    const newHints = generateHint(sanitizedGuess);
    setGuessLog([{ guess, hints: newHints }, ...guessLog]);
    setHints(newHints);
    setTries(tries + 1);
  
    if (sanitizeInput(selectedPokemon!.name) === sanitizedGuess) {
      finishGame(true);
    } else {
      setGuess("");
    }
  };

  const compareTypes = (type1: string, type2: string) => {
    const types1 = type1.split("/");
    const types2 = type2.split("/");
    const commonTypes = types1.filter((type) => types2.includes(type));
    if (commonTypes.length === 2) return "Correct Type";
    if (commonTypes.length === 1) return "Partially Correct Type";
    return "Wrong Type";
  };

  const generateHint = (guess: string): string[] => {
    const guessedPokemon = pokemonData.find(
      (p) => sanitizeInput(p.name) === guess
    );
    if (guessedPokemon) {
      const typeHint = compareTypes(guessedPokemon.type, selectedPokemon!.type);
      const generationHint =
        guessedPokemon.generation === selectedPokemon!.generation
          ? "Correct Generation"
          : Math.abs(guessedPokemon.generation - selectedPokemon!.generation) <=
            1
          ? "Close Generation"
          : "Wrong Generation";
      const weightHint =
        guessedPokemon.weight === selectedPokemon!.weight
          ? "Correct Weight"
          : Math.abs(guessedPokemon.weight - selectedPokemon!.weight) <= 10
          ? "Close Weight"
          : "Wrong Weight";
      const heightHint =
        guessedPokemon.height === selectedPokemon!.height
          ? "Correct Height"
          : Math.abs(guessedPokemon.height - selectedPokemon!.height) <= 0.5
          ? "Close Height"
          : "Wrong Height";
      const legendaryHint =
        guessedPokemon.isLegendary === selectedPokemon!.isLegendary
          ? "Correct Legendary Status"
          : "Wrong Legendary Status";

      return [typeHint, generationHint, weightHint, heightHint, legendaryHint];
    } else {
      return ["Invalid Pokémon Name"];
    }
  };

  const finishGame = (completed: boolean) => {
    localStorage.setItem("selectedPokemon", JSON.stringify(selectedPokemon));
    localStorage.setItem("tries", tries.toString());
    localStorage.setItem("guessLog", JSON.stringify(guessLog)); // Store guess log
    if (completed) {
      if (bestScore === null || tries < bestScore) {
        localStorage.setItem("bestScore", tries.toString());
        setBestScore(tries);
      }
    }
    navigate("/result");
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
      <button className="btn btn-success" onClick={handleGuess}>
        Submit Guess
      </button>
      <div className="hints">
        {hints.map((hint, index) => (
          <Hint key={index} hint={hint} />
        ))}
      </div>
      <button className="btn btn-danger" onClick={() => finishGame(false)}>
        Finish Game
      </button>

      <div className="guess-log">
        <h3>Guess Log</h3>
        {guessLog.map((log, index) => (
          <div key={index} className="log-entry">
            <p>
              <strong>Guess:</strong> {log.guess}
            </p>
            <div className="hints">
              {log.hints.map((hint, hintIndex) => (
                <Hint key={hintIndex} hint={hint} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="score-board">
        <p>Tries: {tries - 1}</p>
        {bestScore !== null && <p>Best Score: {bestScore}</p>}
      </div>
    </div>
  );
};

export default Game;
