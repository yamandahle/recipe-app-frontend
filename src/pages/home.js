import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/recipe-card";
import "./home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    /* fetch all recipes when page loads */
    axios
      .get("http://127.0.0.1:8000/recipes")
      .then((res) => setRecipes(res.data.recipes));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">🍳 Recipes</h1>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id = {recipe.id}
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
