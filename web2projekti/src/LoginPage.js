import React, {useEffect, useState} from "react";
import Axios from "axios";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";

const LoginPage = ({setStatusValue}) => {
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");



    const status = () => {setStatusValue(true)}

    //Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg,
            email: emailReg
        }).then((response) => {
            console.log(response)
        });
    }

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data[0].username);
            }
        });
    }

    const logout = () => {
        Axios.get('http://localhost:3001/logout').then((response) => {
            setLoginStatus("Logged out")
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus("Logged in as: " + response.data.user[0].username)
            }
        })

    }, [])

    return (
        <div>
            <div className="registration">
                <h1>Register</h1>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}/>
                <label>Password</label>
                <input
                    type="password"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}/>
                <label>Email</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setEmailReg(e.target.value);
                    }}/>
                <button onClick={register}>Register</button>
            </div>


            <div className="login">
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                <Link to="/">
                <button onClick={login} onClick={status}>Login</button>
                </Link>
            </div>

            <h1>{loginStatus}</h1>

            <button onClick={logout}>Logout</button>


        </div>
    )
}

export default LoginPage;