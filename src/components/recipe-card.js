import './RecipeCard.css'

const RecipeCard = ({ title, category, image_url, description }) => {
    return (
        <div className = "recipe-card">
            <h2 className ="recipe-title">{title}</h2>
             <img src={image_url} alt={title} />
             <span className ="recipe-category">{category}</span>
             <p className ="recipe-description">{description}</p>
        </div>
    )
}

export default RecipeCard