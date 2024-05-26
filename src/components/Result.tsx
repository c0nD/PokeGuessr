import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../data/pokemon";
import Hint from "./Hint"; // Ensure Hint component is available

const Result: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [tries, setTries] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [guessLog, setGuessLog] = useState<
    { guess: string; hints: string[] }[]
  >([]); // State for guess log

  useEffect(() => {
    const storedPokemon = localStorage.getItem("selectedPokemon");
    if (storedPokemon) {
      setSelectedPokemon(JSON.parse(storedPokemon));
    }
    const storedTries = localStorage.getItem("tries");
    if (storedTries) {
      setTries(Number(storedTries));
    }
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) {
      setBestScore(Number(storedBestScore));
    }
    const storedGuessLog = localStorage.getItem("guessLog"); // Retrieve guess log
    if (storedGuessLog) {
      setGuessLog(JSON.parse(storedGuessLog));
    }
  }, []);

  const restartGame = () => {
    localStorage.removeItem("tries"); // Reset tries for the new game
    localStorage.removeItem("guessLog"); // Reset guess log
    navigate("/");
  };

  const getSpritePath = (name: string) => {
    const url = new URL(`../data/sprites/${name}.png`, import.meta.url).href;
    console.log(url);
    return url;
  };

  const generateResultString = () => {
    return guessLog
      .map((log) => {
        if (log.hints.every((hint) => hint.includes("Correct"))) {
          return "🟩🟩🟩🟩🟩";
        } else if (
          log.hints.some(
            (hint) => hint.includes("Correct") || hint.includes("Close")
          )
        ) {
          return log.hints
            .map((hint) => {
              if (hint.includes("Correct")) return "🟩";
              if (hint.includes("Close")) return "🟨";
              return "⬛";
            })
            .join("");
        } else {
          return "⬛⬛⬛⬛⬛";
        }
      })
      .join("\n");
  };

  const formatTweetContent = () => {
    const resultString = generateResultString();
    const tweetContent = `PokeGuessr Daily ${new Date().toLocaleDateString()} - ${tries} tries\n${resultString}`;
    return tweetContent;
  };

  const formatMessageContent = () => {
    const resultString = generateResultString();
    const messageContent = `PokeGuessr Daily ${new Date().toLocaleDateString()} - ${tries} tries\n${resultString}`;
    return messageContent;
  };

  const shareToTwitter = () => {
    const tweetContent = formatTweetContent();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetContent + "\n🟩🟩🟩🟩🟩" + "\npokeguessr.me"
    )}`;
    window.open(twitterUrl, "_blank");
  };
  const shareToSMS = () => {
    const messageContent = formatMessageContent();
    const smsUrl = `sms:?&body=${encodeURIComponent(messageContent)}`;
    window.open(smsUrl, "_blank");
  };

  return (
    <div className="result">
      <h2>Game Over</h2>
      {selectedPokemon && (
        <>
          <p>The correct Pokémon was {selectedPokemon.name}.</p>
          <img
            src={getSpritePath(selectedPokemon.name)}
            alt={selectedPokemon.name}
            className="img-fluid"
          />
        </>
      )}
      <p>Tries: {tries}</p>
      {bestScore !== null && <p>Best Score: {bestScore}</p>}
      <button className="btn btn-info btn-lg" onClick={shareToTwitter}>
        Share to Twitter
      </button>
      <button className="btn btn-primary btn-lg" onClick={restartGame}>
        Play Again
      </button>
      <button className="btn btn-success btn-lg" onClick={shareToSMS}>
        Share via SMS
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
    </div>
  );
};

export default Result;
