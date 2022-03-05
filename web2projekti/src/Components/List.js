import React, {useEffect, useState} from "react";
import { Table } from 'react-bootstrap'
import axios from "axios";
import Row from "./Row";


const List = () => {

    const [contents, setEvents] = useState([0])

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/events')
            .then(response => {
                console.log('promise fulfilled')
                setEvents(response.data)
            })
    }, [])
    //console.log('render', notes.length, 'notes')

    return(
        <div className="container">
            {/* A JSX comment */}

            {/* <div>
                <p>Valinta 2.</p>
            </div>
            */}
            <Table striped>
            <tbody>
            {contents.map(content => (

                <tr key={content.id}>
                    {
                        //mita
                    }
                    <Row name ={content.name} date ={content.date} location={content.place}>
                    </Row>
                </tr>
            ))}
            </tbody>
            </Table>

        </div>
    )
}

export default List