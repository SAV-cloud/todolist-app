import { useRef } from "react";

const UseRefComponnent = () => {
    const refOnInput = useRef();    

    const focusInpunt = () => {
        refOnInput.current.focus();
    }

    const blureInpunt = () => {
        refOnInput.current.blur();
    }

    return(
        <>
            <input ref={refOnInput}></input>
            <button onClick={focusInpunt}>focus</button>
            <button onClick={blureInpunt}>blure</button>
        </>
    );
}

export default UseRefComponnent;