import React from 'react';
import ReviewPage from "../ReviewPage";
import './styles/modal.css'

const BookDetailsModal = ({children, shown, close, bookItem}) => {


    console.log(bookItem)
    if(!shown || (bookItem == null))   {
        return null;
    }

    const bookId = bookItem.id

    return shown ? (
        <div className="modal-backdrop " onClick={() => {close();}}>
            <div className="modal-content modal-dialog-scrollable" onClick={e => {e.stopPropagation();}}>
                {children}
                <div>
                    <div className="bookImageContainer ">
                        <img className="modal-img" src={bookItem.volumeInfo.imageLinks && bookItem.volumeInfo.imageLinks.thumbnail}/>
                    </div>
                        <div className="bookInfoContainer">
                            <h1>Book Details</h1>
                            <h2>Title: {bookItem.volumeInfo.title}</h2>
                            <h2>Published: {bookItem.volumeInfo.publishedDate}</h2>
                            <h2>Category: {bookItem.volumeInfo.categories}</h2>
                            {bookItem.volumeInfo.authors.length > 1 ?
                                <h2>Authors: {bookItem.volumeInfo.authors + ""}</h2> :
                                <h2>Author: {bookItem.volumeInfo.authors}</h2>
                            }
                        </div>
                    <div className="bookReviewsContainer">
                        <ReviewPage bookId={bookId}></ReviewPage>
                    </div>


                </div>
            </div>
        </div>
    ) : null;
}




export default BookDetailsModal