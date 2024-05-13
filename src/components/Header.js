import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { cve_api } from "../utils/cve_api";

const fetchData = async () => {
    try {
        const response = await fetch(cve_api);
        const data = await response.json();
        console.log(data); // Print data in JSON format
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
const Header = () =>{
    useEffect(() => {
        fetchData();
    }, []);
    };
return (
<div id="table-records">
    
</div>
);

export default Header;