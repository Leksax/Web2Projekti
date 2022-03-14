import React, {useEffect, useState} from "react";
import Axios from "axios";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import NavigationBar from "./NavigationBar";
import './styles/LoginPageStyles.css'
import {FloatingLabel, Form} from "react-bootstrap";

const LoginPage = ({setStatusValue, setUserid}) => {


    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const [statusA, setStatusA] = useState(false)



    const status = () => {

        setStatusValue(true)

    }

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
                setStatusA(true)
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
            <NavigationBar/>
            <div className="RegistrationContainer">
                <form className="has-validation">
                    <h1>Register</h1>
                    <div>
                        <label>Username</label>
                        <input
                            required
                            className="form-control-sm"
                            type="text"
                            onChange={(e) => {
                                setUsernameReg(e.target.value);
                            }}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            required
                            className="form-control-sm"
                            type="password"
                            onChange={(e) => {
                                setPasswordReg(e.target.value);
                            }}/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            required
                            className="form-control-sm"
                            type="text"
                            onChange={(e) => {
                                setEmailReg(e.target.value);
                            }}/>
                    </div>



                    <button className="btn btn-outline-primary" onClick={register}>Register</button>
                </form>
            </div>



            <div className="LoginContainer">
                <form className="has-validation">
                    <h1>Login</h1>
                    <div>
                        <label>Username</label>
                        <input
                            required
                            className="form-control-sm"
                            type="text"
                            placeholder="username"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            required
                            className="form-control-sm"
                            type="password"
                            placeholder="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}/>
                    </div>

                    <button className="btn btn-outline-primary" onClick={login}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;