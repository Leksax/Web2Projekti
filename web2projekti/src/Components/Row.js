import React from 'react'

const Row = (props) =>  {
    return(
        <td>
            <p>{props.name}</p>
            <p>{props.date}</p>
            <p>{props.location}</p>

        </td>
    )
}

export default Row