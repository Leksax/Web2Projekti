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
/*
    useEffect(() => {
        Axios.get('http://localhost:3001/getReview').then(response => {
            setContent(response.data[0])
        })
    })*/

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

                <ul className="reviewlist">
                    {reviews.map((row) => (
                        <li>
                            <article key={row}>
                                <p className="test" alt={"asd"}>{row.review_id}</p>
                            </article>
                        </li>
                    ))}
                </ul>

                <button onClick={deleteReview}>Poisto testi</button>

            </div>
        )
    }
}

export default ReviewPage