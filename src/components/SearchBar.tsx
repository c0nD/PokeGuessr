import React, { useState } from "react";
import pokemonColorPalettes from "../styles/palettes/pokemon_color_palettes";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const palette = pokemonColorPalettes.find(
      (p) => p.pokemon.toLowerCase() === search.toLowerCase()
    );
    if (palette) {
      updateStyles(palette.colors);
    } else {
      alert("No color palette found for this Pokémon");
    }
  };

  const updateStyles = (colors: Array<{ color: string; width: number }>) => {
    const root = document.documentElement;
    colors.forEach((colorObj, index) => {
      root.style.setProperty(`--pokemon-color-${index}`, colorObj.color);
    });
  };

  return (
    <form onSubmit={handleSearchSubmit} className="search-bar">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Pokémon"
        className="form-control"
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
