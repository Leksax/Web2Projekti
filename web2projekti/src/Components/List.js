import {useEffect, useState} from "react";
import Axios from "axios";
import './List.css'
import BookDetailsModal from "./BookDetailsModal";

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
                            <article  key={row}>
                                <div onClick={() => {toggleModal(!modalShown);setItem(row)}}  className="book-image">
                                    <img className="photo" src={row.volumeInfo.imageLinks && row.volumeInfo.imageLinks.smallThumbnail} alt={"asd"} />
                                </div>
                                <div className="book-content">
                                    <h2 className="book-name">{row.volumeInfo.title} </h2>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
                <BookDetailsModal shown={modalShown} bookItem={bookItem} close={() => {toggleModal(false)}}/>
            </div>


        )

    }

}

export default List