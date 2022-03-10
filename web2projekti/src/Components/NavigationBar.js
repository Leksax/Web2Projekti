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
                    <div className="Home">Home</div>
                <div className="SearchBar">
                    <input
                        type="text"
                        ref={inputRef}
                        value={inputValue}
                        onChange={() => setInputValue(inputRef.current.value)}
                        placeholder="Search.."
                    />
                    <button  onClick={search}>Search</button>
                </div>
                <div className="userdropdown">
                    <div className="userdropdown-menu" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                        Username
                        {state ? (<ul className="userdropdown-list" onMouseEnter={showDropdown}>
                                <li>User details</li>
                                <li>Logout</li>
                            </ul>) :
                            null}
                    </div>
                </div>
                <div>
                    <Link to="/LoginPage">{text}</Link>
                </div>
            </div>
        )
}

export default NavigationBar