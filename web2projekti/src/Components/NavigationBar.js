import React, {createRef, useState} from 'react'
import './NavigationBar.css'

const NavigationBar = ({setSearchedValue}) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = createRef();

    const search = () => setSearchedValue(inputValue);





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
            </div>
        )
}

export default NavigationBar