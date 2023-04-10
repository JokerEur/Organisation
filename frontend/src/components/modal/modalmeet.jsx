import React, {Fragment, useState} from "react";
import Examples from "../form/formmeet"

const handleOKClick = () => {
    setChoice(true)
    setModalOn(false)
}
const handleCancelClick = () => {
    setChoice(false)
    setModalOn(false)
}

const Meet = ({ setModalOn, setChoice }) => {

    return (

        <div className="  w=[50%] bg-zinc-200 opacity-100 fixed inset-0 z-50   ">
            <Examples/>           
        </div>

    );
}

export default Meet
