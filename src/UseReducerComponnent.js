import React, { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_NAME':
        return { ...state, name: action.payload };
      case 'SET_LASTNAME':
        return { ...state, lastName: action.payload };
      case 'SET_BIRTHYEAR':
        return { ...state, birthYear: action.payload };
      default:
        return state;
    }
  };
  
  const initialState = { name: '', lastName: '', birthYear: '' };

const UseReducerComponnent = () => {
    

const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    dispatch({ type: `SET_${e.target.name.toUpperCase()}`, payload: e.target.value });
  };

  return (
    <div>
      <div>
        <label>Ім'я:</label>
        <input type="text" name="name" value={state.name} onChange={handleInputChange} />
        <button onClick={() => dispatch({ type: 'SET_NAME', payload: state.name })}>Ім'я</button>
      </div>
      <div>
        <label>Прізвище:</label>
        <input type="text" name="lastName" value={state.lastName} onChange={handleInputChange} />
        <button onClick={() => dispatch({ type: 'SET_LAST_NAME', payload: state.lastName })}>Призвище</button>
      </div>
      <div>
        <label>Рік народження:</label>
        <input type="date" name="birthYear" value={state.birthYear} onChange={handleInputChange} />
        <button onClick={() => dispatch({ type: 'SET_BIRTH_YEAR', payload: state.birthYear })}>Рік народження</button>
      </div>
      <div>
        <h3>Об'єкт:</h3>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );

}

export default UseReducerComponnent;