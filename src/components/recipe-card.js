import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState ,useEffect } from "react";

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
  const handleSave = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/recipes/${id}/save`,
        {},
        { headers: { token: token } },
      );
      if (response.data.message === "Recipe saved!") {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } catch (error) {
      console.log("Save error:", error);
    }
  };

  /*show the heart button if clicked previously */
  useEffect(() => {
    if (!token) return
    axios.get(`http://127.0.0.1:8000/me/saved`, {
        headers: { token: token }
    })
    .then(res => {
        const saved = res.data.saved_recipes
        const isAlreadySaved = saved.some(r => r.id === id)
        setIsSaved(isAlreadySaved)
    })
}, [id])

  return (
    <div className="recipe-card" onClick={goToRecipePage}>
      {/*show small heart to save the favorite recipes */}
      <div className="card-image-wrapper">
        <img src={image_url} alt={title} />
        {token && (
          <button className="heart-btn" onClick={(e) => handleSave(e)}>
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
