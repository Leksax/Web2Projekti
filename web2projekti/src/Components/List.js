import {useEffect, useState} from "react";
import harrypotter from './harrypotter.jpg'
import './List.css'

const List = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/getReview")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>Lataa</>;
    } else {
        return (
            <div className="wrapper">
                <ul className="book-grid">
                    {items.map((Row) => (
                        <li>
                            <article className="book" key={Row.dateCreated}>
                                <div className="book-image">
                                    <img className="photo" src={harrypotter} alt={"asd"} />
                                </div>
                                <div className="book-content">
                                    <h2 className="book-name">{Row.book_id}</h2>
                                    <ol className="book-list">
                                    </ol>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default List