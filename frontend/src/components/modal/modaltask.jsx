import React, {Fragment, useState} from "react";
import Examples from "../form/formtask"

const handleOKClick = () => {
    setChoice(true)
    setModalOn(false)
}
const handleCancelClick = () => {
    setChoice(false)
    setModalOn(false)
}

const Task = ({ setModalOn, setChoice }) => {

    return (

        <div className="  w=[50%] bg-zinc-200 opacity-100 fixed inset-0 z-50   ">
            <Examples/>
        </div>

    );
}
export default Task
