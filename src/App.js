import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Output from './components/Output';

function App() {
  const [UUID, setUUID] = useState("")
  // useState
  return (
    <div className="App">
      <header className="App-header">
        <Input />
        <Output />
      </header>
    </div>
  );
}

export default App;
