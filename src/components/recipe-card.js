import './RecipeCard.css'
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ id , title, category, image_url, description }) => {
        const navigate = useNavigate()  
    const goToRecipePage = () => { navigate(`/recipes/${id}`) }
    return (
        
        <div className = "recipe-card" onClick={goToRecipePage}>
            <h2 className ="recipe-title">{title}</h2>
             <img src={image_url} alt={title} />
             <span className ="recipe-category">{category}</span>
             <p className ="recipe-description">{description}</p>
        </div>
        
    )
}

export default RecipeCard