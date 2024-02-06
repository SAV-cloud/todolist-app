import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const UseEffectComponnent = () => {
    const [value, setValue] = useState(0);
    const textInput = React.createRef();
    const elementRef = useRef(null);

    useEffect (()=> {
        console.log('didMount');
    }, []);

    useEffect(()=> {
        console.log('WikkUpdate');
    },[value]);

    const updateValue = () => {
        setValue(textInput.current.value);
        textInput.current.value = '';
    }

    const changeValue = () => {
        
    }

    useLayoutEffect(() => {

    } , []);

    useLayoutEffect(() => {
        console.log(elementRef);
        const newParagraph = document.createElement('p');
        newParagraph.textContent = `This is paragraph`;
        elementRef.current.appendChild(newParagraph);
    } , []);
    return (
        <>
            <div ref={elementRef}>
                <p>{value}</p>
                <input onInput={changeValue} ref={textInput}></input>
                <button onClick={updateValue}>update</button>
                <h2>useLayoutEffect Example</h2>
            </div>
        </>
    );
}

export default UseEffectComponnent;