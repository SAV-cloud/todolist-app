import { Component } from "react";
import uuid from 'react-uuid';

class MyClassComponent extends Component {
    state = {
        todos: [
            {id: uuid(), name: 'tetst1'},
            {id: uuid(), name: 'tetst2'},
            {id: uuid(), name: 'tetst3'},
        ],
        input: '',
        timer: 0,
        // shouldRerender: false
    };

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => ({timer: prevState.timer + 1}))
        }, [1000]);

        const lsTodos = localStorage.getItem('todos');
        if (lsTodos) {
            this.setState({todos: JSON.parse(lsTodos)})
        }
        console.log('componentDidMount');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.todos !== this.state.todos) {
            console.log('componentDidUpdate');
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
        }
    }

    addTask = () => {
        const nextValue = {id: uuid(), name: this.state.input}
        this.setState({todos: [...this.state.todos, nextValue]});
        this.setState({input: ''});
    }

    onChangHandler = (e) => {
        const value = e.target.value;
        this.setState({input: value});
    }

    clearStorage = () => {
        const newValues = [];
        localStorage.clear();
        this.setState({
            todos: newValues,
            // shouldRerender: !this.state.shouldRerender // Toggle shouldRerender
        });
    }

    deleteElement = (e) => {
 
        const newValues = this.state.todos.filter((el) => 
            el.id !== e
        )
        console.log(newValues);
        localStorage.removeItem(e);
        this.setState({
            todos: newValues,
            // shouldRerender: !this.state.shouldRerender // Toggle shouldRerender
        });
    }

    componentWillUnmount() {
       clearInterval(this.intervalId);
    }

    render() {
        return (
            <>
            <h2>{this.state.timer}</h2>
                <input value={this.state.input} onChange={this.onChangHandler}></input>
                <button onClick={this.addTask} >Add Todo</button>
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li key={todo.id}>{todo.name}
                            <button onClick={()=>(this.deleteElement(todo.id))} >Delete</button>
                        </li>
                    ))}
                </ul>
                <button onClick={this.clearStorage} >Clear tasks</button>
            </>
        )
    }
}

export default MyClassComponent;