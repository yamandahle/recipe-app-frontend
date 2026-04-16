import './comment.css'

const Comment = ({ author, text, time }) => {
    return (
        <div className="comment-box">
            <div className="comment-header">
                <span className="comment-author">{author}</span>
                <span className="comment-time">{time}</span>
            </div>
            <p className="comment-text">{text}</p>
        </div>
    )
}

export default Comment