import {useEffect, useState} from "react";
import Axios from "axios";
import './List.css'
import BookDetailsModal from "./BookDetailsModal";
import StarRating from "./StarRating";
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


const List = () => {
    const key ="kopioi"

    const [search, setSearch] = useState("")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [bookItem, setItem] = useState(false);
    const [modalShown, toggleModal] = useState(false);

    useEffect(() => {

        Axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key='+key+'&maxResults=40&printType=books')
            .then(res => {
                setIsLoaded(true);
                setItems(res.data.items)
                console.log(items)
            })
            .catch(err => {
                setIsLoaded(true);
                console.log(err)
            })



    }, [search])


    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>Lataa</>;
    } else  {
        return (
            //{row.volumeInfo.imageLinks && row.volumeInfo.imageLinks.smallThumbnail}

            <div className="wrapper">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="sr-only"></span>
                    </label>
                </div>
                <ul className="book-grid">
                    {items.map((row) => (
                        <li>
                            <Card onClick={() => {toggleModal(!modalShown);setItem(row)}} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={row.volumeInfo.imageLinks && row.volumeInfo.imageLinks.smallThumbnail} />
                                <Card.Body >
                                    <Card.Title>{row.volumeInfo.title}</Card.Title>
                                    <StarRating bookId={row.id}  />;
                                </Card.Body>
                            </Card>
                        </li>
                    ))}
                </ul>
                <BookDetailsModal shown={modalShown} bookItem={bookItem} close={() => {toggleModal(false)}}/>
            </div>


        )

    }

}

export default List