import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const RecipeCard = ({ id, title, category, image_url, description }) => {
  const navigate = useNavigate();

  /*to update the favorite recipes */
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  //go to the selected page
  const goToRecipePage = () => {
    navigate(`/recipes/${id}`);
  };

  //handle save recipe
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/recipes/${id}/save`,
        {},
        { headers: { token: token } },
      );
      // toggle saved status based on response
      if (response.data.message === "Recipe saved!") {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } catch (error) {
      setMessage("Something went wrong!");
    }
  };
  return (
    <div className="recipe-card" onClick={goToRecipePage}>
       {/*show small heart to save the favorite recipes */}
      <div className="card-image-wrapper">
        <img src={image_url} alt={title} />
        {token && (
          <button className="heart-btn" onClick={handleSave}>
            {isSaved ? "❤️" : "🤍"}
          </button>
        )}
      </div>


      
      <h2 className="recipe-title">{title}</h2>
      <span className="recipe-category">{category}</span>


      <p className="recipe-description">{description}</p>
    </div>
  );
};

export default RecipeCard;
