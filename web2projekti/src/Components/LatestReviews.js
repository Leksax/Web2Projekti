import React, {useEffect, useState} from 'react'
import './LatestReviews.css'
import $ from 'jquery';
import Axios from "axios";
import BookDetailsModal from "./BookDetailsModal";
import {Card} from "react-bootstrap";
import StarRating from "./StarRating";

const LatestReviews = () => {
    const [counter, setCounter] = useState(-1);
    const key ="asdasdafsdsa"
    const [theArray, setTheArray] = useState([])
    const [reviews, setReviews] = useState([])
    const [bookItem, setItem] = useState(false);
    const [modalShown, toggleModal] = useState(false);


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
        setCounter(counter + 1)
        if(reviews.length == 0)  {
            return
        } else if (counter < reviews.length) {

            getBookPhotos();

        }
        return

    }, [reviews, theArray]);



    const getBookPhotos = () => {


        Axios.get('https://www.googleapis.com/books/v1/volumes?q='+reviews[counter].book_id+'&key='+key)
            .then(res => {
                console.log(res.data.items)
                setTheArray(oldArray => [...oldArray, res.data.items[0]])
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
                    {[...theArray].reverse().map((row) => (
                        <Card className="image" onClick={() => {toggleModal(!modalShown);setItem(row)}} style={{ width: '18rem' }}>
                            <Card.Img  variant="top" src={row.volumeInfo.imageLinks && row.volumeInfo.imageLinks.smallThumbnail} />
                            <Card.Body >
                                <Card.Title>{row.volumeInfo.title}</Card.Title>
                                <StarRating className="stars" bookId={row.id}  />
                            </Card.Body>
                        </Card>

                        ))}
                </div>
                <a className="next" onClick={(e) => scroll(null, 1)}>&#10095;</a>
                <BookDetailsModal shown={modalShown} bookItem={bookItem} close={() => {toggleModal(false)}}/>
            </div>
    )
}

export default LatestReviews