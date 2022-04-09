import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  // get keys
  const APP_ID = "1e2946d5";
  const APP_KEY = "21df6842d0a6a134cd5fb204ef688e55";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]); // only runs when query changes

  // takes care of fetching data
  const getRecipes = async () => {
    // once the reponse comes back, we will await, then fetch.
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    // after the repsone comes back, turn it into a json.
    // need await for every promise because we never know when it will come back from the api.
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    // we could have use .then promises, but this looks better.
  };

  const updateSearch = (e) => {
    // having trouble figuring out what the event and its target actually are.
    setSearch(e.target.value);
    console.log(search);
  };

  // every time we submit the form, we want to get our search.
  const getSearch = (e) => {
    e.preventDefault(); // stops page from reloading
    setQuery(search);
    setSearch(""); // visually appealing and logical
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        ></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );
};

export default App;
