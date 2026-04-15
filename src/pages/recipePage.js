import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./recipePage.css";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    /* fetch the recipe when page loads*/
    axios
      .get(`http://127.0.0.1:8000/recipes/${id}`)
      .then((res) => setRecipe(res.data));
  }, [id]);

  /* show loading while recipe is being fetched*/
  if (recipe === null) {
    return <h2>Loading...</h2>;
  }

  /* extract YouTube video id from URL*/
  const videoId = recipe.video_url.split("v=")[1];

  /*return all the selected recipe details*/
  return (
    <div className="recipe-detail-page">
      <img
        className="recipe-detail-image"
        src={recipe.image_url}
        alt={recipe.title}
      />

      <h1 className="recipe-detail-title">{recipe.title}</h1>
      <span className="recipe-detail-category">{recipe.category}</span>
      <p className="recipe-detail-description">{recipe.description}</p>

      {/* ingredients as bullet points */}
      <h2 className="recipe-section-title">Ingredients</h2>
      <ul className="recipe-ingredients">
        {recipe.ingredients.split(",").map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>

      {/* steps as numbered list */}
      <h2 className="recipe-section-title">Steps</h2>
      <ol className="recipe-steps">
        {recipe.steps
          .split(/\d+\./)
          .filter((step) => step.trim() !== "")
          .map((step, index) => (
            <li key={index}>{step.trim()}</li>
          ))}
      </ol>
      <h2>Video</h2>
      <iframe
        className="recipe-video"
        src={`https://www.youtube.com/embed/${videoId}`}
        width="100%"
        height="400"
        allowFullScreen
        title="recipe video"
      />
    </div>
  );
};

export default RecipePage;
