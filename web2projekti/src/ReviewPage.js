import React, {useEffect, useState} from "react";
import Axios from "axios";

const ReviewPage = ({bookId}) => {
    const [reviewBody, setReviewBody] = useState("")
    const [stars, setStars] = useState("")
    const [reviews, setReviews] = useState("")
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [poster, setPoster] = useState("")


    useEffect(() => {
        getReview()
        getUsername()
    }, [])


    useEffect(() => {
        console.log("päivittyy")

        getReview();

    }, [isUpdating])


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
        setIsLoaded(false)
        const date = new Date();
        const obj = JSON.parse('{"reviewStars":"'+ stars + '", "reviewDateCreated":"'+ date.toString() + '", "reviewBody":"'+ reviewBody + '", "review_id":"'+ (reviews.length) + '", "user_id":"1", "book_id":"'+ bookId +'"}');
        reviews.push(obj)
        console.log(reviews)

        setReviews((prevTitles) => {
            return [...new Set([...prevTitles, obj])];
        });


        setIsLoaded(true)
        console.log(bookId + " ReviewPage")
        Axios.post('http://localhost:3001/writeReview', {
            body: reviewBody,
            stars: stars,
            bookId: bookId,
            postedBy: 1
        }).then((response) => {
            console.log(response)
            setIsUpdating(true)
        });


    }
    const getUsername = () => {
        Axios.post('http://localhost:3001/getUsername', {
            byUser_id: 1
        }).then((response) => {
            setPoster(response.data[0].username)
        })
    }

    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>Lataa</>;
    } else {
        return (
            <div>
                <form className="has-validation">
                    <h2 className="card-title">Enter review</h2>
                    <textarea
                        className="form-control"
                        rows="3"
                        type="text"
                        onChange={(e) => {
                            setReviewBody(e.target.value);
                        }}
                        required
                    />
                    <br/>
                    <label>Stars:</label>
                    <input
                        className="form-control-sm"
                        min="1"
                        max="5"
                        type="number"
                        onChange={(e) => {
                            setStars(e.target.value);
                        }}
                        required
                    />
                    <br/>
                    <br/>
                    <button className="btn btn-primary btn-lg" onClick={submitReview}>Submit Review</button>
                    <br/>
                    <br/>
                </form>

                <h1>Reviews</h1>

                <ul className="list-group">
                    {reviews.map((row) => (
                        <li className="list-group-item list-group-item-action">
                            <article key={row}>
                                <h2>User: {poster}</h2>
                                <h3 className="mb-1">{row.reviewBody}</h3>
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