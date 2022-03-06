import {useEffect, useState} from "react";
import Axios from "axios";
import './List.css'
import BookDetailsModal from "./BookDetailsModal";

const List = () => {
    const [search, setSearch] = useState("")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [bookItem, setItem] = useState(false);
    const [show, setShow] = useState(false);

    //     set search query to empty string
    const [q, setQ] = useState("");
    //     set search parameters
    //     we only what to search countries by capital and name
    //     this list can be longer if you want
    //     you can search countries even by their population
    // just add it to this array
    const [searchParam] = useState(["capital", "name"]);

    useEffect(() => {
        console.log("loop1")
        Axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyDZmyv8cNTFgTAbwc2D6q_-MB4vlLAF4Jw&maxResults=20&printType=books')
            .then(res => {

                setIsLoaded(true);
                //console.log(res.data.items)
                setItems(res.data.items)
                console.log(items)
            })
            .catch(err => {
                setIsLoaded(true);
                console.log(err)
            })
    }, [search]) //estää loopin

    /*
    useEffect(() => {
        Axios.get('https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyCZ9sOe77Idn9JDEhbyBP0-6WLXlUUb_ho')
            .then(res => {
                console.log(res.data.items)
                setItems(res.data.items)
            })
            .catch(err => {
                console.log(err)
            })
    })
    */

    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>Lataa</>;
    } else {
        /*
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });

         */
    }

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
                            /*
                            // set the value of our useState q
                            //  anytime the user types in the search box
                            */
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="sr-only">Search countries here</span>
                    </label>
                </div>
                <ul className="book-grid">
                    {items.map((row) => (
                        <li>
                            <article  key={row}>
                                <div onClick={() => {setShow(true);setItem(row)}}  className="book-image">
                                    <img className="photo" src={row.volumeInfo.imageLinks && row.volumeInfo.imageLinks.smallThumbnail} alt={"asd"} />
                                </div>
                                <div className="book-content">


                                    <h2 className="book-name">{row.volumeInfo.title} </h2>
                                    <ol className="book-list">
                                    </ol>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
                <BookDetailsModal show={show} bookItem={bookItem}/>
            </div>


        )

}

export default List