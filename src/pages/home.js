import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import "./Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    /* fetch all recipes when page loads */
    axios
      .get("http://127.0.0.1:8000/recipes")
      .then((res) => setRecipes(res.data.recipes));
  }, []);

  //filter the recipes according to the search words
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="home-container">
      <h1 className="home-title">🍳 Recipes</h1>


      {/*show the search box*/}
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search recipes by name or category..."
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>


      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            category={recipe.category}
            image_url={recipe.image_url}
            description={recipe.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
