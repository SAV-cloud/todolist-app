import { useState } from "react";
import React from "react";
import './ItemComponent.scss';

const ItemComponent = (props) => {
    const [isActive, setIsActive] = useState(props.state);

    const handleClick = event => {
        setIsActive(current => !current);
        props.onClick();
      };

    return(
        <>
            <li key={props.id} className={isActive ? 'list-item ok' : 'list-item'} onClick={handleClick}>{props.el}</li>
            {props.children}
        </>
    );
}

export default ItemComponent;