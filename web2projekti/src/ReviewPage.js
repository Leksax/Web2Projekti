import React, {useState} from "react";
import Axios from "axios";

const ReviewPage = () => {
    const [reviewBody, setReviewBody] = useState("")
    const [stars, setStars] = useState("")
    const [reviews, setReviews] = useState("")

    //hakee tällä hetkellä vain yhden arvostelun (array[0]) paitsi consoleen tulee kaikki
    const getReviews = () => {
        Axios.get('http://localhost:3001/getReview').then((response) => {
            console.log(response)
            setReviews(
                "USER: " + response.data[0].user_id + " " +
                "Review ID: " + response.data[0].review_id + " " +
                "BOOK: " + response.data[0].book_id + " " +
                "DATE: " + response.data[0].dateCreated + " " +
                "STARS: " + response.data[0].reviewStars + " " +
                "Review: " + response.data[0].body
                )
        })
    }

    //poiston testausta
    const deleteReview = () => {
        Axios.post('http://localhost:3001/deleteReview').then((response) => {
            console.log(response)
        })
    }

    const submitReview = () => {
        Axios.post('http://localhost:3001/writeReview', {
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

            <h1>Reviews</h1>
            <button onClick={getReviews}>Hae arvostelut (testi)</button>
            <p>{reviews}</p>
            <button onClick={deleteReview}>Poisto testi</button>
        </div>
    )
}

export default ReviewPage;