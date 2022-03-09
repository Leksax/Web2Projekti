import React, {useState} from "react";
import Axios from "axios";

const ReviewPage = ({bookId}) => {
    const [reviewBody, setReviewBody] = useState("")
    const [stars, setStars] = useState("")
    const [reviews, setReviews] = useState("")

    const getReview = () => {
        Axios.post('http://localhost:3001/getReview', {
            bookId: bookId
        }).then((response) => {
                console.log(response)
                setReviews(response.data[1].reviewBody)
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
            console.log("testi")
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
            <button onClick={getReview}>Hae arvostelut (testi)</button>
            <p>{reviews}</p>
            <button onClick={deleteReview}>Poisto testi</button>

        </div>
    )
}

export default ReviewPage;