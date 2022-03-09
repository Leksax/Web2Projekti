import React, {useEffect, useState} from 'react'
import './LatestReviews.css'
import $ from 'jquery';
import Axios from "axios";

const LatestReviews = () => {
    const key ="kopiioiw"
    const [theArray, setTheArray] = useState([])
    const [reviews, setReviews] = useState([])


    const fetchData = () => {
        fetch("http://localhost:3001/getReviews")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setReviews(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])



    useEffect(() => {
        if(reviews.length == 0)  {
            return
        } else  {
            console.log(reviews);
            console.log(reviews.length);
            getBookPhotos();
        }

    }, [reviews]);




    const getBookPhotos = () => {
        console.log(reviews)
        console.log(reviews)

        Axios.get('https://www.googleapis.com/books/v1/volumes?q='+reviews[0].book_id+'&key='+key)
            .then(res => {
                console.log(res.data.items)
                setTheArray(oldArray => [...oldArray, res.data.items[0].volumeInfo.imageLinks.smallThumbnail])
                console.log(theArray)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const scroll = (event, direction) => {
        console.log("test1")
        let far = $( '.image-container' ).width()/2*direction;
        let pos = $('.image-container').scrollLeft() + far;
        $('.image-container').animate( { scrollLeft: pos }, 1000)
    }

    return (
            <div className="wrapper">
                <a className="prev" onClick={(e) => scroll(null, -1)}>&#10094;</a>
                <div className="image-container">
                    {theArray.map((row) => (
                        <img className="photo" src={row} alt={"asd"} />
                    ))}
                </div>
                <a className="next" onClick={(e) => scroll(null, 1)}>&#10095;</a>

            </div>
    )
}

export default LatestReviews