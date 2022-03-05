import React from 'react'

const Row = (props) =>  {
    return(
        <td>
            <p>{props.book_id}</p>
            <p>{props.dateCreated}</p>

        </td>
    )
}

export default Row