import React from "react";
import { Link } from "react-router-dom";

function Menu()
{
    return(
        <h1>
            This is the menu page! <br></br>
            <Link to ="/"> Welcome </Link>
        </h1>
    )
}

export default Menu;