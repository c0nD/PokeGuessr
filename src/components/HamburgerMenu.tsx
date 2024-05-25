import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const HamburgerMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Menu right width={"300px"}>
      <h2 className="menu-title">Menu</h2>
      <button
        className="btn btn-primary menu-button"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <div className="search-container">
        <SearchBar />
      </div>
      <p className="menu-instruction">
        Enter a Pokémon name to update the page style!
      </p>
    </Menu>
  );
};

export default HamburgerMenu;
