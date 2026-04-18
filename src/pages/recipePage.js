import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./RecipePage.css";
import Comment from "../components/comment";
import { useNavigate } from "react-router-dom";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  /*for the comment list */
  const [comments, setComments] = useState([]);
  /*for adding a new comment*/
  const [newComment, setNewComment] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  /*to update a new rate and the average rate */
  const [newRate, setNewRate] = useState(0);
  const [average, setAverage] = useState(0);

  const navigate = useNavigate();


  /*decode the token to get current user id*/
  const getCurrentUserId = () => {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id;
  };
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    /* fetch the recipe when page loads*/
    axios
      .get(`http://127.0.0.1:8000/recipes/${id}`)
      .then((res) => setRecipe(res.data));

    /*fetch all the comments to the specific recipe*/
    axios
      .get(`http://127.0.0.1:8000/recipes/${id}/comments`)
      .then((res) => setComments(res.data.comments));

    /*fetch the average rate*/
    axios
      .get(`http://127.0.0.1:8000/recipes/${id}/rating`)
      .then((res) => setAverage(res.data.average_rating));
  }, [id]);

  /* show loading while recipe is being fetched*/
  if (recipe === null) {
    return <h2>Loading...</h2>;
  }

  //handle add comment
  const handleAddComment = async () => {
    try {
      /*save the details and send them to the server */
      const response = await axios.post(
        `http://127.0.0.1:8000/recipes/${id}/comments`,
        {
          text: newComment,
        },
        { headers: { token: token } },
      );
      setMessage(response.data.message);
      /*refresh the comments agian after adding a new comment */
      axios
        .get(`http://127.0.0.1:8000/recipes/${id}/comments`)
        .then((res) => setComments(res.data.comments));
    } catch (error) {
      setMessage("Something went wrong!");
    }
  };

  //handle rating
  const handleRate = async (star) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/recipes/${id}/rate`,
        { score: star },
        { headers: { token: token } },
      );
      console.log("Rate response:", response.data); // ← check this
      setNewRate(star);
      setAverage(response.data.average_rating);
    } catch (error) {
      setMessage("Something went wrong!");
    }
  };

  // handle delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/comments/${commentId}`, {
        headers: { token: token },
      });
      // refresh comments
      axios
        .get(`http://127.0.0.1:8000/recipes/${id}/comments`)
        .then((res) => setComments(res.data.comments));
    } catch (error) {
      setMessage("Could not delete comment!");
    }
  };

  //handle delete recipe
  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/recipes/${id}`, {
        headers: { token: token },
      });
      navigate("/");
    } catch (error) {
      setMessage("Could not delete recipe!");
    }
  };



  /* extract YouTube video id from URL*/
  const videoId = recipe.video_url.split("v=")[1];

  /*return all the selected recipe details*/
  return (
    <div className="recipe-detail-page">
      {/*show successfull message if the comment added */}
      {message && <p>{message}</p>}

      <img
        className="recipe-detail-image"
        src={recipe.image_url}
        alt={recipe.title}
      />

      <h1 className="recipe-detail-title">{recipe.title}</h1>
      <span className="recipe-detail-category">{recipe.category}</span>

      {/* display rating */}
      <div className="rating-section">
        <p className="average-rating">
          {average > 0 ? `⭐ ${average} / 5` : "No ratings yet"}
        </p>
        {token && (
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= newRate ? "selected" : ""}`}
                onClick={() => handleRate(star)}
              >
                ★
              </span>
            ))}
          </div>
        )}
      </div>

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

      {/*for displaying the comments and adding a new comment*/}
      <div className="comments-table">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            author={comment.author}
            text={comment.text}
            time={comment.created_at}
            onDelete={handleDeleteComment}
            isOwner={comment.user_id === currentUserId}
            id={comment.id}
          />
        ))}
      </div>

      <div className="add-comment">
        <label>Add new comment :</label>
        <input
          type="text"
          placeholder=""
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          type="button"
          className="btn btn-light"
          onClick={handleAddComment}
        >
          Post
        </button>
      </div>

      {/*delete recipe button */}
      {currentUserId === recipe.user_id && (
        <button className="delete-recipe-btn" onClick={handleDeleteRecipe}>
          Delete Recipe
        </button>
      )}

    </div>
  );
};

export default RecipePage;
