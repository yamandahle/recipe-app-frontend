import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeCard from '../components/recipe-card'
import './Favorite.css'



const Favorites = () => {
    const token = localStorage.getItem('token')
    const [savedRecipes, setSavedRecipes] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/me/saved', {
            headers: { token: token }
        })
        .then(res => setSavedRecipes(res.data.saved_recipes))
    }, [])

    return (
        <div className="favorites-page">
            <h1 className="favorites-title">❤️ My Favorites</h1>

            {savedRecipes.length === 0 ? (
                <div className="empty-favorites">
                    <p>You haven't saved any recipes yet!</p>
                    <p>Click the ❤️ button on any recipe to save it here.</p>
                </div>
            ) : (


                <div className="recipes-grid">
                    {savedRecipes.map(recipe => (
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
}

export default Favorites