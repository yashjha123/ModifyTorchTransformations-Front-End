import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import InputSequence from './components/InputSequence';
import Output from './components/Output';

function App() {
  const [UUID, setUUID] = useState("")
  const [Trans, setTrans] = useState("torch.nn.Sequential()")
  const [ImgURL,setImgURL] = useState("")
  const [SubmitDisabled, setSubmitDisabled] = useState(true)
  // useState
  return (
    <div className="App">
      <header className="App-header">
        <Input setUUID={setUUID} setSubmitDisabled={setSubmitDisabled}/>
        <InputSequence SubmitDisabled={SubmitDisabled} ImgURL setImgURL={setImgURL} Trans ={Trans} setTrans={setTrans} setUUID={setUUID} UUID={UUID} />
        <Output ImgURL={ImgURL} />
      </header>
    </div>
  );
}

export default App;
