import { useState } from "react";
import {  useEffect } from 'react';
import axios from 'axios';
import RecipeCard from "../components/RecipeCard";
import "./Profile.css"

const Profile = () => {
  //get the current token
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
 

  useEffect(() => {
    /* fetch the info of the user and set them in one object when page loads*/
    axios
      .get(`http://127.0.0.1:8000/me`, { headers: { token: token } })
      .then((res) => setUser(res.data));

    /*fetch all my recipes */
    axios
      .get(`http://127.0.0.1:8000/me/recipes`, { headers: { token: token } })
      .then((res) => setMyRecipes(res.data.recipes));


  }, []);

return (
    <div className="profile-page">
        {user && (
            <div className="profile-header">
                <div className="profile-avatar-circle">👤</div>
                <div className="profile-info">
                    <h1>{user.full_name}</h1>
                    <p>{user.email}</p>
                </div>
            </div>
        )}

        <h2 className="profile-section-title">🍳 My Recipes</h2>
        {myRecipes.length === 0 ? (
            <div className="empty-message">
                <p>You haven't added any recipes yet!</p>
            </div>
        ) : (
            <div className="recipes-grid">
                {myRecipes.map(recipe => (
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
        )}
    </div>
)
};

export default Profile ;
