import React from "react";
import { Link } from "react-router-dom";

function Welcome()
{
    return(
        <h1>
            This is the welcome page! <br></br>
             <Link to ="/desserts"> Go to Dessert Menu </Link>
             <Link to ="/bakeacake"> Go to Bake a Cake </Link>
             <Link to ="/login"> Login </Link>
             <Link to ="/register"> Register </Link>
        </h1>
    )
}

export default Welcome;