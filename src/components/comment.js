import './comment.css'

const Comment = ({ id, author, text, time, onDelete, isOwner }) => {
    return (
        <div className="comment-box">
            <div className="comment-header">
                <span className="comment-author">{author}</span>
                <span className="comment-time">{time}</span>
            </div>
            <p className="comment-text">{text}</p>
            {/*only show the dekete button to the own user*/}
            {isOwner && (
                <button className="delete-comment-btn" onClick={() => onDelete(id)}>
                    Delete
                </button>
            )}
        </div>
    )
}

export default Comment