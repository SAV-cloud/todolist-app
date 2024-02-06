import React from "react";
import './ButtonComponent.scss'

const ButtonComponent = (props) => {
    return(
        <button className="button-68" type={props.type} onClick={props.onClick}>{props.text}</button>
    );
}

export default ButtonComponent;