import React from "react";
import './Components/styles/App.css';
import LoginPage from "./Components/LoginPage";
import ReviewPage from "./ReviewPage";
import FrontPage from "./Components/FrontPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import LatestReviews from "./Components/LatestReviews";
import List from "./Components/List";

function App() {
    const [searchedValue, setSearchedValue] = React.useState();
    const [statusValue, setStatusValue] = React.useState();
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<div><NavigationBar statusValue={statusValue} setSearchedValue={setSearchedValue} />
                    <LatestReviews  />
                    <List searchedValue={searchedValue} />
                </div>
                }></Route>
                <Route path="/LoginPage" element={<LoginPage setStatusValue={setStatusValue}/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
