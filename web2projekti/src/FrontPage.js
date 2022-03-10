import NavigationBar from "./Components/NavigationBar";
import React from "react";
import LatestReviews from "./Components/LatestReviews";
import List from "./Components/List";

function FrontPage(){
    const [searchedValue, setSearchedValue] = React.useState();
    return (
        <div>
        <NavigationBar setSearchedValue={setSearchedValue} />
        <LatestReviews  />
        <List searchedValue={searchedValue} />
        </div>

    );
}
export default FrontPage;