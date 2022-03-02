import React, {useState} from 'react'
import './NavigationBar.css'

const NavigationBar = () => {
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
                        <input type="text" placeholder="Search..."/>
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