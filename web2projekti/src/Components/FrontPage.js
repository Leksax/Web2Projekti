import NavigationBar from "./NavigationBar";
import React from "react";
import LatestReviews from "./LatestReviews";
import List from "./List";

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