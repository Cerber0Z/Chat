import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Principal() {
    console.log("_id" + cookies.get("_id"));
    console.log("_id" + cookies.get("_id"));
    return (
        <div>
            <p>inicio chat</p>
        </div>
    );
}

export default Principal;
