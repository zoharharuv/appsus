export function BookReview({ review, onDeleteReview}) {
    return (
        <div className="book-review">
            <h5>Posted at: {review.readAt}</h5>
            <h3>By: {review.name}</h3>
            <p>{review.txt}</p>
            <h3>{'⭐'.repeat(review.rate)}</h3>
            <button className="delete-review-btn" onClick={()=>{
                onDeleteReview(review.id)
            }}>X</button>
        </div>
    )
}