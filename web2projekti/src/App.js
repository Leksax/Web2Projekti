import React from "react";
import './App.css';
import LoginPage from "./LoginPage";
import ReviewPage from "./ReviewPage";
import FrontPage from "./FrontPage";
import List from "./Components/List";
import LatestReviews from "./Components/LatestReviews";
import NavigationBar from "./Components/NavigationBar";

function App() {
    const [searchedValue, setSearchedValue] = React.useState();


  return (
    <div className="App">
        <LoginPage />
        <NavigationBar setSearchedValue={setSearchedValue} />
        <LatestReviews  />
        <List searchedValue={searchedValue} />


    </div>
  );
}

export default App;
