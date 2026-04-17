import "./addRecipe.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [video_url, setVideoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /* send the data to the server */
  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/recipes",
        {
          title: title,
          description: description,
          ingredients: ingredients,
          steps: steps,
          image_url: image_url,
          video_url: video_url,
          category: category,
        },
        { headers: { token: token } },
      );
      setMessage("Recipe added successfully!");
      //return to the home page after adding a new recipe
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage("Something went wrong!");
    }
  };

  //handle upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        { headers: { token: token, "Content-Type": "multipart/form-data" } },
      );
      setImageUrl(response.data.image_url);
      setImageFile(file);
    } catch (error) {
      setMessage("Image upload failed!");
    }
  };

  return (
    <div className="new-recipe">
      <h2>🍳 Add New Recipe</h2>
      {message && <p className="success-message">{message}</p>}

      {/* title — small single line */}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Recipe title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* description — medium single line */}
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          placeholder="Short description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* ingredients — bullet style textarea */}
      <div className="form-group">
        <label>
          🧂 Ingredients <span className="hint">(separate with commas)</span>
        </label>
        <textarea
          className="ingredients-input"
          placeholder="e.g. 2 eggs, 1 cup flour, 1 cup milk"
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      {/* steps — numbered textarea */}
      <div className="form-group">
        <label>
          📋 Steps <span className="hint">(e.g. 1. Mix. 2. Bake.)</span>
        </label>
        <textarea
          className="steps-input"
          placeholder="1. Mix ingredients&#10;2. Bake for 30 min&#10;3. Serve hot"
          onChange={(e) => setSteps(e.target.value)}
        />
      </div>

      {/* image url */}
      {/* image upload */}
      <div className="form-group">
        <label>🖼️ Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        {image_url && (
          <img
            src={image_url}
            alt="preview"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />
        )}
      </div>

      {/* video url */}
      <div className="form-group">
        <label>🎥 YouTube Video URL</label>
        <input
          type="text"
          placeholder="Paste YouTube link here"
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

      {/* category — small dropdown */}
      <div className="form-group form-group-small">
        <label>🍽️ Category</label>
        <select
          className="category-select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Add Recipe
      </button>
    </div>
  );
};

export default AddRecipe;
