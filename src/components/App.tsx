import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import Result from "./Result";

const App: React.FC = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:mode" element={<Game />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;
