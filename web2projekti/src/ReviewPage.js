import React, {useState} from "react";
import Axios from "axios";

const ReviewPage = () => {
    const [reviewBody, setReviewBody] = useState("")
    const [stars, setStars] = useState("")

    const submitReview = () => {
        Axios.post('http://localhost:3001/review', {
            body: reviewBody,
            stars: stars
        }).then((response) => {
            console.log(response)
        });
    }

    return (
        <div>
            <h1>Enter review</h1>
            <input
                type="text"
                onChange={(e) => {
                    setReviewBody(e.target.value);
                }}
            />
            <label>Stars</label>
            <input
                type="number"
                onChange={(e) => {
                    setStars(e.target.value);
                }}
            />
            <button onClick={submitReview}>Submit Review</button>
        </div>
    )
}

export default ReviewPage;