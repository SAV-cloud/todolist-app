import React from "react";
import { useState, useEffect } from "react";
import ItemComponent from './ItemComponent';
import uuid from 'react-uuid';
import ButtonComponent from "./ButtonComponent";
import './ListComponent.scss';
import './ButtonComponent.scss'

const ListComponent = () => {
    // const initialValuses = [
    //     {id: uuid(), name: 'tetst1'},
    //     {id: uuid(), name: 'tetst2'},
    //     {id: uuid(), name: 'tetst3'},
    // ];
    const options = [
        {id: uuid(), name: 'Всі'},
        {id: uuid(), name: 'Активні'},
        {id: uuid(), name: 'Виконані'}
    ];
    const [selectedOption, setSelectedOption] = useState('Всі');
    const [isLoading, setisLoading] = useState(false);
    const [item, setItem] = useState([]);
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState('');

    const OnClickHandler = () => {
        if (value.length >= 3 && value.length <= 50) {
            const nextElement = {id: uuid(), name: value, state: false}
            if (selectedOption === 'Всі') {
                const nextItem = [...item, nextElement];
                setItem(nextItem);
                localStorage.setItem('item', JSON.stringify(nextItem));
                setValue('');
            } else {
                const itemsFromLocalStorage = JSON.parse(localStorage.getItem('item'));
                const nextItem = [...itemsFromLocalStorage, nextElement];
                setItem(nextItem);
                localStorage.setItem('item', JSON.stringify(nextItem));
                setValue('');
                filterItems(selectedOption !== 'Активні');
            }
        }
    }

    const OnInputHandler = (event) => {
        const maxLength = 50;
        if (event.target.value.length >= 0 && event.target.value.length < 3) {
            console.log("Error");
            setError('Min length : 3');
        } else if (event.target.value.length > maxLength) {
            console.log(maxLength);
            setError(`Max length: ${maxLength}`);
        } else {
            setError('');
        }
        setValue(event.target.value);
    }

    const OnKeyDown = (event) => {
        if (event.key === "Enter") { 
            OnClickHandler();
        } 
    }

    const RemoveItemHandler = (idProp) => {
        const itemsFromLocalStorage = JSON.parse(localStorage.getItem('item'));
        const filteredValues = itemsFromLocalStorage.filter((el) => el.id !== idProp);
        setItem(filteredValues);
        localStorage.setItem('item', JSON.stringify(filteredValues));
        if (selectedOption === 'Всі') {
            filterItems(null);
        } else {
            filterItems(selectedOption !== 'Активні');
        }
        
    }

    const clearStorage = () => {
        const newValues = [];
        localStorage.clear();
        setItem(newValues);
    }


    useEffect(() => {
        const itemsFromLocalStorage = JSON.parse(localStorage.getItem('item'));
        console.log('First login: ', itemsFromLocalStorage);
        if (itemsFromLocalStorage) {
         setItem(itemsFromLocalStorage);
        }
        setTimeout(()=>{
            setisLoading(true);
        }, 1000);
      }, []);

    const filterItems = (condition) => {
        console.log(condition);
        let itemsFromLocalStorage = JSON.parse(localStorage.getItem('item'));

        if (itemsFromLocalStorage) {
            itemsFromLocalStorage = condition != null ? itemsFromLocalStorage.filter((el) => {
               return (el.state === condition && el.name.startsWith(searchValue));
            }) : itemsFromLocalStorage.filter((el) => {
                return (el.name.startsWith(searchValue));
             });
            setItem(itemsFromLocalStorage);
        }
    }

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        switch (selectedValue) {
            case 'Активні':
                filterItems(false);
            break;
            case 'Виконані':
                filterItems(true);
            break;
            default:
                filterItems(null);
        }
    }

    const changeState = (idProp) => {
        const itemsFromLocalStorage = JSON.parse(localStorage.getItem('item'));
        if (selectedOption === 'Всі') {
            itemsFromLocalStorage.forEach ((el) => {
                if (el.id === idProp) {
                    el.state = !el.state;
                }
            });
            setItem(itemsFromLocalStorage);
            localStorage.setItem('item', JSON.stringify(itemsFromLocalStorage));
        } else {
            itemsFromLocalStorage.forEach ((el) => {
                if (el.id === idProp) {
                    el.state = !el.state;
                }
            });
            localStorage.setItem('item', JSON.stringify(itemsFromLocalStorage));
            filterItems(selectedOption !== 'Активні');
        }
    }

    const SearchHandler = (event) => {
        setSearchValue(event.target.value);
        let serchedValues = JSON.parse(localStorage.getItem('item'));
        if (selectedOption === 'Всі') {
            serchedValues = serchedValues.filter((el)=> {
                console.log(el.state);
                return el.name.startsWith(event.target.value);
            });
            setItem(serchedValues);
        }  else {
            serchedValues = serchedValues.filter((el)=> {
                console.log(el.state);
                return (el.name.startsWith(event.target.value) && el.state === (selectedOption !== 'Активні'));
            });
            setItem(serchedValues);
        }
    }


    return (
        <>
            {isLoading ?
                <div className="section">
                    <div className="input-container">
                        <div>
                            <input className="input-field" onInput={OnInputHandler} onKeyDown={((event) => OnKeyDown(event))} value={value} placeholder='New Task'></input>
                            <span className="focus-border"></span>
                        </div>
                        <div className="warning-container">
                            {error && <p className="warning">{error}</p>}
                        </div>
                    </div>
                    <button className="button-68" onClick={()=>OnClickHandler(value)}>Add Item</button>
                    <input onInput={SearchHandler} placeholder='Search' value={searchValue}></input>
                    <p className="counter">{item.length ? `${item.length}` : ''}</p>
                    <select value={selectedOption} onChange={handleOptionChange}>
                        {
                            options.map((el) => (
                                <option key={el.id}>
                                    {el.name}
                                </option>
                            ))
                        }
                    </select>
                    <ul>
                        {item.length ? item.map((el) => (
                            <div className="list"  key={el.id}>
                                <ItemComponent el={el.name} id={el.id} state={el.state} className="list" onClick={()=>changeState(el.id)}>
                                    {<ButtonComponent text={'delete'} onClick={(()=>RemoveItemHandler(el.id))} type={'button'} id={el.id}></ButtonComponent>}
                                </ItemComponent>
                            </div>
                        )) : <p>Немає елементів</p>}
                    </ul>
                    <button className="button-68" onClick={clearStorage} >Clear tasks</button>
                </div> :
                <div className="divLoader">
                    <svg className="svgLoader" viewBox="0 0 100 100" width="3em" height="3em">
                        <path ng-attr-d="{{config.pathCmd}}" ng-attr-fill="{{config.color}}" stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#fff" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
                    </svg>
                </div>
            }
        </>
    );
}

export default ListComponent;