import React from "react";
import './App.css';
import LoginPage from "./LoginPage";
import ReviewPage from "./ReviewPage";
import FrontPage from "./FrontPage";
import List from "./Components/List";
import LatestReviews from "./Components/LatestReviews";

function App() {
  return (
    <div className="App">
        <LoginPage />
        <FrontPage />
        <LatestReviews />
<List />


    </div>
  );
}

export default App;
