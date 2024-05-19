import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game");
  };

  return (
    <div className="home">
      <h1>Welcome to PokeGuessr!</h1>
      <p>Who's that Pokemon!?</p>
      <button className="btn btn-primary" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default Home;
