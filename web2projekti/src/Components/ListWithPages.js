import {useEffect, useState} from "react";
import Axios from "axios";
import './List.css'
import BookDetailsModal from "./BookDetailsModal";
import ReactPaginate from 'react-paginate';

const List = () => {

    const itemsPerPage = 20;
    const [search, setSearch] = useState("")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [bookItem, setItem] = useState(false);
    const [show, setShow] = useState(false);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);



    useEffect(() => {
        Axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyDZmyv8cNTFgTAbwc2D6q_-MB4vlLAF4Jw&printType=books')
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
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [search, itemOffset, itemsPerPage]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

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
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="sr-only">Search countries here</span>
                </label>
            </div>
            <ul className="book-grid">
                {currentItems.map((row) => (
                    <li>
                        <article  key={row}>
                            <div onClick={() => {setShow(true);setItem(row)}}  className="book-image">
                                <img className="photo" src={row.volumeInfo.imageLinks && row.volumeInfo.imageLinks.smallThumbnail} alt={"asd"} />
                            </div>
                            <div className="book-content">
                                <h2 className="book-name">{row.volumeInfo.title} </h2>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
            <BookDetailsModal show={show} bookItem={bookItem} onClose={()=>setShow(false)}/>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </div>


    )

}

export default List