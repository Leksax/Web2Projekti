import React, {useEffect, useState} from "react";
import Star from "./Star";
import Axios from "axios";
function StarRating({ bookId }) {


    const [rating, setRating] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getReview()
    }, [bookId])

    const getReview = () => {
        Axios.post('http://localhost:3001/getReview', {
            bookId: bookId
        })
            .then(data => {
                setRating(ArrayAvg(data.data))
                setIsLoaded(true);
            })
            .catch(err => {
                setIsLoaded(true);
                console.log(err)
            })
    }

    function ArrayAvg(reviews) {
        var i = 0, sum = 0, ArrayLen = reviews.length;
        while (i < ArrayLen) {
            sum = sum + reviews[i++].reviewStars;
        }
        return sum / ArrayLen;
    }


    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>Lataa</>;
    } else {
        return (
            <span>
      {[1, 2, 3, 4, 5].map((value) => (
          <Star
              key={value}
              filled={value <= rating}
          />
      ))}
    </span>
        )
    }
}
export default StarRating;