import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import CodeEditor from "./CodeEditor";

const EditorDialog = ({ setShowDialog, ShowDialog, Code, setCode }) => {
  const editorRef = useRef(null);
  const handleClose = ()=>{
    setShowDialog(false);
  }
  return (
    <div>
      <Modal
        show={ShowDialog}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit your code here!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CodeEditor
            height="40vh"
            Code={Code}
            setCode={setCode}
            editorRef={editorRef}
            Trans={"Trans"}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {navigator.clipboard.writeText(Code)}}>
            <FontAwesomeIcon icon={faCopy} />
            {' '}Copy
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </div>
  );
};

export default EditorDialog;
