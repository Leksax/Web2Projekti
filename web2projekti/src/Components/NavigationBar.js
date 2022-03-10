import React, {createRef, useEffect, useState} from 'react'
import './NavigationBar.css'
import {Link} from "react-router-dom";

const NavigationBar = ({setSearchedValue, statusValue}) => {

    const [inputValue, setInputValue] = useState("");
    const inputRef = createRef();

    const search = () => setSearchedValue(inputValue);

    const [text, setText] = useState("");
    const nappulaTeksti = () => {
        if (statusValue){
            setText("Log out")
        }
        else if (!statusValue){
            setText("Log in")
        }
    };
    useEffect(() => {
        nappulaTeksti()

    }, [])


        const [state, setState] = useState(false);
        const showDropdown = () => {
            setState(true);
        }
        const hideDropdown = () => {
            setState(false);
        }
        return (
            <div className="navigationBar">
                    <div className="Home">
                        <Link to="/">
                            <button className="btn btn-primary">Home</button>
                        </Link>
                    </div>
                <div className="SearchBar">
                    <input
                        type="text"
                        ref={inputRef}
                        value={inputValue}
                        onChange={() => setInputValue(inputRef.current.value)}
                        placeholder="Search.."
                    />
                    <button className="btn btn-primary" onClick={search}>Search</button>
                </div>
                <div className="LoginRegister">
                    <Link to="/LoginPage">
                        <button className="btn btn-primary">Login / Register</button>
                    </Link>
                </div>
            </div>
        )
}

export default NavigationBar