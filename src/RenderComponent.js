import React from "react";
import ItemComponent from './ItemComponent'
const RenderConponent = () => {

    const toDo = [
        {id: 1, todo: 'firdtTodo'},
        {id: 2, todo: 'secondtTodo'},
        {id: 3, todo: 'thirdTodo'},
        {id: 4, todo: 'foutrthTodo'}
    ]

    return (
        <>
            {
                toDo.map((todo, index)=>{
                    return <ItemComponent key={index} el={todo.todo} index={todo.id}/>;
                })
            }
        </>
    );
}

export default RenderConponent;