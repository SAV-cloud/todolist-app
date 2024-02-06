import ListComponent from './components/ListComponent'
import './App.css';
import MyClassComponent from './components/MyClassComponent';
import { useState } from 'react';

function App() {
  const[isShowTimer, setIsShowTimer] = useState(false);

  return (

    <div className="App">
      <header className="App-header">
        {isShowTimer ?<MyClassComponent></MyClassComponent> : <ListComponent/>}
        <button onClick={() => setIsShowTimer((prev) => !prev)}>Show timer</button>
      </header>
    </div>
  );
}

export default App;
