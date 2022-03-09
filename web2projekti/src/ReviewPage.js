import React, {useEffect, useState} from "react";
import Axios from "axios";

const ReviewPage = ({bookId}) => {
    const [reviewBody, setReviewBody] = useState("")
    const [stars, setStars] = useState("")
    const [reviews, setReviews] = useState("")
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        getReview()
    }, [])

    const getReview = () => {
        Axios.post('http://localhost:3001/getReview', {
            bookId: bookId
        })
        .then(data => {
            setReviews(data.data)
            setIsLoaded(true);
        })
        .catch(err => {
            setIsLoaded(true);
            console.log(err)
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

    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>Lataa</>;
    } else {
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

                <ul className="list-group">
                    {reviews.map((row) => (
                        <li className="list-group-item list-group-item-action">
                            <article key={row}>
                                <h2>User: {row.user_id}</h2>
                                <h1 className="mb-1">{row.reviewBody}</h1>
                                <h5>Stars: {row.reviewStars}</h5>
                                <small className="text-muted">{row.reviewDateCreated}</small>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default ReviewPage