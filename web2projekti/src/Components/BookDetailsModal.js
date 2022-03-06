

import React from 'react';



const BookDetailsModal = ({show,bookItem}) => {
    console.log(bookItem)
    if(!show || (bookItem == null))   {
        return null;
    }
    return(

    <div id="productModal" className="active">
        Testi
        <img src={bookItem.volumeInfo.imageLinks && bookItem.volumeInfo.imageLinks.smallThumbnail}/>
        <span className="description">{bookItem.volumeInfo.title}</span>

    </div> ) }




export default BookDetailsModal