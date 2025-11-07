import React from "react";
import Search from "./search";

export default function App(){
    const sample = [
        {text: "Understanding the difference between grid-template and grid-auto"},
        {text:"Oct 09, 2018"},
        {text: "With all the new properties related to CSS  Grid Layout, one of the distinctions that always confused me was the difference between grid-template-rows/columns and grid-auto-rows/columnns. Although I knew they were to d..."},
        {text: "Recreating the GitHUb Contribution Graph with CSS Grid Layout"},
    ];

    return (
        <div className="App">
        <hl>Search Example</hl>
        <search items = {sample}/>
        </div>
    );
}
