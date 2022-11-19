import { useEffect, useState } from "react";
import "./App.css";
import Upload from "./components/Upload";
import InputSequence from "./components/InputSequence";
import Output from "./components/Output";
import { Alert, Stack } from "react-bootstrap";
import MyNav from "./components/MyNav";
import EditorDialog from "./components/EditorDialog";
function App() {
  const [UUID, setUUID] = useState("");
  const [Trans, setTrans] = useState("transforms.Compose([\n\t\n])");
  const [ImgURL, setImgURL] = useState("");
  const [SubmitDisabled, setSubmitDisabled] = useState(true);
  const [Conf, setConf] = useState("");
  const [AlertText, setAlertText] = useState("");
  const [ShowDialog, setShowDialog] = useState(true);
  const [Code, setCode] = useState(Trans);
  useEffect(() => {
    if (AlertText != "") {
      setTimeout(() => {
        setAlertText("");
      }, 10000);
    }
  }, [AlertText]);
  // useState
  useEffect(() => {
    document.addEventListener(
      "keydown",
      function (e) {
        if (
          e.keyCode === 83 &&
          (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
        ) {
          e.preventDefault();
          // Process event...
        }
      },
      false
    );
  }, []);
  return (
    <div className="App">
      <MyNav />
      <EditorDialog
        Code={Code}
        setCode={setCode}
        setShowDialog={setShowDialog}
        ShowDialog={ShowDialog}
      />
      {AlertText ? (
        <Alert className="alert-nav" key={"danger"} variant={"danger"}>
          {AlertText}
        </Alert>
      ) : (
        ""
      )}

      <header className="App-header">
        <Stack direction="horizontal" gap={3}>
          <Upload
            setUUID={setUUID}
            setSubmitDisabled={setSubmitDisabled}
            setAlertText={setAlertText}
          />
          <div className="vr" />
          <InputSequence
            Code={Code}
            setCode={setCode}
            setConf={setConf}
            SubmitDisabled={SubmitDisabled}
            ImgURL
            setImgURL={setImgURL}
            Trans={Trans}
            setTrans={setTrans}
            setUUID={setUUID}
            UUID={UUID}
            setAlertText={setAlertText}
            setShowDialog={setShowDialog}
          />
          <div className="vr" />
          <Output Conf={Conf} ImgURL={ImgURL} />
        </Stack>
      </header>
    </div>
  );
}

export default App;
