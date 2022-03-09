import { FaStar } from "react-icons/fa";
import React from "react";

function Star({ filled, onClick }) {
    return (
        <FaStar
            color={filled ? "orange" : "lightgray"}
            onClick={onClick} />
    );
}
export default Star;