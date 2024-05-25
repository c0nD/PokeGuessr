import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import Result from "./Result";
import HamburgerMenu from "./HamburgerMenu";

const App: React.FC = () => {
  return (
    <div className="app">
      <HamburgerMenu />
      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:mode" element={<Game />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
