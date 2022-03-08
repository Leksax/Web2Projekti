import React from 'react';
import ReviewPage from "../ReviewPage";
import './modal.css'

const BookDetailsModal = ({show,bookItem,onClose}) => {
    const myStyle = {
        display: "none"
    };



    console.log(bookItem)
    if(!show || (bookItem == null))   {
        return null;
    }

    const bookId = bookItem.id
    console.log(bookId + " BookDetailsModal")

    return (

        <div id="myModal" className="modal">
            <div id="modal-content" className="modal">
                <span className="close" onClick={onClose}>&times;</span>
                <img src={bookItem.volumeInfo.imageLinks && bookItem.volumeInfo.imageLinks.thumbnail}/>
                <h1>Book Details</h1>
                <h1>Title: {bookItem.volumeInfo.title}</h1>
                <h1>Author: {bookItem.volumeInfo.authors}</h1>
                <h1>Published: {bookItem.volumeInfo.publishedDate}</h1>
                <h1>Category: {bookItem.volumeInfo.categories}</h1>
                <h1>Book ID: {bookItem.id}</h1>
                <ReviewPage bookId={bookId}></ReviewPage>

            </div>
        </div>
    )
}




export default BookDetailsModal