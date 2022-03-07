import React from "react";
import './App.css';
import LoginPage from "./LoginPage";
import ReviewPage from "./ReviewPage";
import FrontPage from "./FrontPage";
import List from "./Components/List";

function App() {
  return (
    <div className="App">
        <LoginPage />
        <FrontPage />
        <List />
    </div>
  );
}

export default App;
