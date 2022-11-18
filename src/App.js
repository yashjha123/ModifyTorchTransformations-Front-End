import { useState } from 'react';
import './App.css';
import Upload from './components/Upload';
import InputSequence from './components/InputSequence';
import Output from './components/Output';

function App() {
  const [UUID, setUUID] = useState("")
  const [Trans, setTrans] = useState("torch.nn.Sequential()")
  const [ImgURL,setImgURL] = useState("")
  const [SubmitDisabled, setSubmitDisabled] = useState(true)
  const [Conf, setConf] = useState("")
  // useState
  return (
    <div className="App">
      <header className="App-header">
        <Upload setUUID={setUUID} setSubmitDisabled={setSubmitDisabled}/>
        <InputSequence setConf={setConf} SubmitDisabled={SubmitDisabled} ImgURL setImgURL={setImgURL} Trans ={Trans} setTrans={setTrans} setUUID={setUUID} UUID={UUID} />
        <Output Conf={Conf} ImgURL={ImgURL} />
      </header>
    </div>
  );
}

export default App;
