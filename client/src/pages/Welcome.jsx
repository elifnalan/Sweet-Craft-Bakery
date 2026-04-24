import React from "react";
import { Link } from "react-router-dom";

function Welcome()
{
    return(
        <h1>
            This is the welcome page! <br></br>
             <Link to ="/menu"> Menu </Link>
        </h1>
    )
}

export default Welcome;