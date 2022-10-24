import './App.css';
import React, { useState, useEffect } from "react"
import Pokemon from "./pokemon";

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(res => res.json())
      .then(data => {
        setPokemonData(data.results)
      })
      .catch(err => console.error(err))
  }, []);
  
  return (
    <div className="App">
      {pokemonData.map(item => <Pokemon name={item.name} url={item.url}></Pokemon>)}
    </div>
  );
}

export default App;


// https://pokeapi.co/api/v2/pokemon to get all names
// take url from each result as a description request