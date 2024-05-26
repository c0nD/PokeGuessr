import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const startGame = (mode: "infinity" | "daily") => {
    navigate(`/game/${mode}`);
  };

  return (
    <div className="home">
      <h1>Welcome to PokeGuessr</h1>
      <p>Who's That Pokemon?!</p>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => startGame("infinity")}
      >
        Start Infinity Game
      </button>
      <button
        className="btn btn-secondary btn-lg"
        onClick={() => startGame("daily")}
      >
        Start Daily Game
      </button>
    </div>
  );
};

export default Home;
