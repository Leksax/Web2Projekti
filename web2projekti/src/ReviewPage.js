import React, {useState} from "react";
import Axios from "axios";

const ReviewPage = ({bookId}) => {
    const [reviewBody, setReviewBody] = useState("")
    const [stars, setStars] = useState("")
    const [reviews, setReviews] = useState("")

    //hakee tällä hetkellä vain yhden arvostelun (array[0]) paitsi consoleen tulee kaikki
    const getReviews = () => {
        Axios.get('http://localhost:3001/getReview').then((response) => {
            console.log(response)
            setReviews(
                "USER: " + response.data[1].user_id + " " +
                "Review ID: " + response.data[1].review_id + " " +
                "BOOK: " + response.data[1].book_id + " " +
                "DATE: " + response.data[1].dateCreated + " " +
                "STARS: " + response.data[1].reviewStars + " " +
                "Review: " + response.data[1].body
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
        console.log(bookId + " ReviewPage")
        Axios.post('http://localhost:3001/writeReview', {
            body: reviewBody,
            stars: stars,
            bookId: bookId
        }).then((response) => {
            console.log(response)
        });
    }
/*
    useEffect(() => {
        Axios.get('http://localhost:3001/getReview').then(response => {
            setContent(response.data[0])
        })
    })*/

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