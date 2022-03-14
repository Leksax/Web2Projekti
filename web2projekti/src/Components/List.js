import {useEffect, useState} from "react";
import './styles/List.css'
import BookDetailsModal from "./BookDetailsModal";
import StarRating from "./StarRating";
import { Card } from 'react-bootstrap';
import axios from "axios";
import eikuvaa from './images/eikuvaa.png';


const List = (searchedValue) => {

    const key = "asdasd"
    const [searchValue, setSearchValue] = useState("")
    const [search, setSearch] = useState("")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [Items, setItems] = useState([]);
    const [bookItem, setItem] = useState(false);
    const [modalShown, toggleModal] = useState(false);

    const [isFetching, setIsFetching] = useState(false);
    //setting tha initial page
    const [page, setPage] = useState(0);
    //we need to know if there is more data
    const [HasMore, setHasMore] = useState(true);



    useEffect(() => {
        setItems([])

        loadMoreItems();

    }, [searchedValue])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setSearch(searchValue)
    }

    const setPhoto = (row) => {
        if(row.volumeInfo.imageLinks && row.volumeInfo.imageLinks.smallThumbnail)   {
            return (row.volumeInfo.imageLinks && row.volumeInfo.imageLinks.smallThumbnail)
        } else {
            return eikuvaa
        }
    }



    function loadMoreItems() {
        setIsFetching(true);
        console.log(searchedValue.searchedValue)

        axios({
            method: "GET",
            url: "https://www.googleapis.com/books/v1/volumes?",
            params: {q: searchedValue.searchedValue, key: key, maxResults: 40, printType: "books", startIndex: page},
        })
            .then((res) => {
                setItems((prevTitles) => {
                    return [...new Set([...prevTitles, ...res.data.items])];
                });
                setPage((prevPageNumber) => prevPageNumber + 40);
                setHasMore(true);
                setIsFetching(false);
                if(res.data.items.length > 0)   {
                    setIsLoaded(true)
                }

            })
            .catch((e) => {
                console.log(e);
                setIsLoaded(true)
            });
    }


    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>Lataa</>;
    } else {
        return (




            //{row.volumeInfo.imageLinks && row.volumeInfo.imageLinks.smallThumbnail}

            <div className="wrapper">

                <ul className="book-grid">
                        {Items.map((row, index) => {
                            if (Items.length === index + 1) {
                                return (
                                    <div key={index}>
                                        <li>
                                            <Card onClick={() => {toggleModal(!modalShown);setItem(row)}} style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={setPhoto(row)}/>
                                                <Card.Body >
                                                    <Card.Title>{row.volumeInfo.title}</Card.Title>
                                                    <StarRating bookId={row.id}  />;
                                                </Card.Body>
                                            </Card>
                                        </li>
                                    </div>
                                )
                            } else {
                                return <li>
                                    <Card onClick={() => {toggleModal(!modalShown);setItem(row)}} style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={setPhoto(row)} />
                                        <Card.Body >
                                            <Card.Title>{row.volumeInfo.title}</Card.Title>
                                            <StarRating bookId={row.id}  />;
                                        </Card.Body>
                                    </Card>
                                </li>;
                            }
                        })}
                </ul>
                        {isFetching && <p></p>}
                        {!isFetching && HasMore && (
                            <button onClick={loadMoreItems}>Load more</button>
                        )}
                <BookDetailsModal shown={modalShown} bookItem={bookItem} close={() => {toggleModal(false)}}/>

            </div>
        )
    }

}

export default List