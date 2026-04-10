import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeCard from '../components/recipe-card'


const Home = () => {
    
    const [recipes,setRecipes] = useState([]);


    useEffect(() => {
        /* fetch all recipes when page loads */
        axios.get('http://127.0.0.1:8000/recipes')
            .then(res => setRecipes(res.data.recipes))
    }, [])


    return (
        <div>
            {recipes.map(recipe => (<RecipeCard 
            key={recipe.id}
            title = {recipe.title}
            category={recipe.category}
            image_url ={recipe.image_url}
            description ={recipe.description}
             />

            ))}
        </div>


    )
}

export default Home;