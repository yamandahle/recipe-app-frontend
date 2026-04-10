const RecipeCard = ({ title, category, image_url, description }) => {
    return (
        <div>
            <h2>{title}</h2>
             <h4>{category}</h4>
             <img src={image_url} alt={title} />
             <p>{description}</p>
        </div>
    )
}

export default RecipeCard