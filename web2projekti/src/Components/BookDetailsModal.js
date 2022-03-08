import React from 'react';
import ReviewPage from "../ReviewPage";
import './modal.css'

const BookDetailsModal = ({children, shown, close, bookItem}) => {


    console.log(bookItem)
    if(!shown || (bookItem == null))   {
        return null;
    }

    const bookId = bookItem.id
    console.log(bookId + " BookDetailsModal")

    return shown ? (
        <div className="modal-backdrop" onClick={() => {close();}}>
            <div className="modal-content" onClick={e => {e.stopPropagation();}}>
                {children}
                <div>
                    <div>
                        <img src={bookItem.volumeInfo.imageLinks && bookItem.volumeInfo.imageLinks.thumbnail}/>
                        <div className="info">
                            <h1>Book Details</h1>
                            <h1>Title: {bookItem.volumeInfo.title}</h1>
                            <h1>Author: {bookItem.volumeInfo.authors}</h1>
                            <h1>Published: {bookItem.volumeInfo.publishedDate}</h1>
                            <h1>Category: {bookItem.volumeInfo.categories}</h1>
                            <h1>Book ID: {bookItem.id}</h1>
                        </div>
                        <ReviewPage bookId={bookId}></ReviewPage>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}




export default BookDetailsModal