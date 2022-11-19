import {
  faCoffee,
  faExpand,
  faRectangleList,
  faWindowMaximize,
  faPlus,
  faWandMagic,
  faWandMagicSparkles,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import CodeEditor from "./CodeEditor";
import transformations from "../transformations.json";
const InputSequence = ({
  setConf,
  SubmitDisabled,
  ImgURL,
  setImgURL,
  setUUID,
  UUID,
  Trans,
  setTrans,
  setAlertText,
  Code,
  setCode,
  setShowDialog,
}) => {
  const editorRef = useRef(null);
  const [Normalised, setNormalised] = useState(false)
  const [Scale, setScale] = useState(false)
  const [Type, setType] = useState("0");
  const [transList, setTransList] = useState(transformations.value);
  const onSubmit2 = (e) => {
    e.preventDefault();
    setTrans(editorRef.current.getValue());
    if (!UUID) {
      alert("Upload image first!");
      return;
    }
    var responseHeaders;
    fetch("http://localhost:5000/applyTransformations", {
      method: "POST",
      body: JSON.stringify({
        id: UUID,
        transforms: editorRef.current.getValue(),
        conf: {
          normalize_range: Normalised,
          scale_range: Scale,
        },
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          // alert("Not okay!")
          console.log(res);
          return res.json().then((res) => {
            setAlertText(res.error + "\n" + res.message);
            console.log(res);
          });
        } else {
          return res.formData();
        }
      })
      .then((res) => {
        const val = JSON.parse(res.get("field0"));
        setConf(val);
        const imageObjectURL = URL.createObjectURL(res.get("field1"));
        console.log(imageObjectURL);
        setImgURL(imageObjectURL);
      })
      .catch((error) => {
        // alert(error);
        console.log(error);
      });
  };
  useEffect(() => {
    setCode(transList[parseInt(Type)].code);
  }, [Type]);
  const addNew = () => {
    const current = transList[parseInt(Type)].name;
    setTransList([
      ...transList,
      {
        name: current + " (copy)",
        code: Code,
        index: transList.length,
      },
    ]);
  };
  return (
    <div className="block">
      <InputGroup className="mb-3">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option>Open this select menu</option>
          {transList.map((value) => (
            <option key={value.index} value={value.index}>
              {value.name}
            </option>
          ))}
        </Form.Select>
        <Button onClick={addNew}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </InputGroup>
      <Button
        onClick={(e) => setShowDialog(true)}
        variant="outline-dark"
        style={{
          float: "right",
          borderBottom: "0px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <FontAwesomeIcon icon={faExpand} />
      </Button>
      <Button
        style={{
          float: "left",
          borderBottom: "0px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
        variant="outline-dark"
        onClick={() => {
          navigator.clipboard.writeText(Code);
        }}
      >
        <FontAwesomeIcon icon={faCopy} />{" "}
      </Button>
      <Form onSubmit={onSubmit2}>
        <CodeEditor
          Code={Code}
          setCode={setCode}
          editorRef={editorRef}
          Trans={Trans}
          height="20vh"
        />
        <br />
        {/* <InputGroup className="mb-3"> */}
          {/* <Row> */}
            <Row>
              <Form.Check
                type="switch"
                id="Normalise"
                disabled={SubmitDisabled}
                label="Scale color range?"
                onClick={(e) => {
                  setScale(e.target.checked)
                }}
              />
            </Row>
            <Row>
              <Form.Check
                type="switch"
                disabled={SubmitDisabled}
                id="custom-switch"
                label="Normalise color range?"
                onClick={(e) => {
                  setNormalised(e.target.checked)
                }}
              />
            </Row>
          {/* </Row> */}
        {/* </InputGroup> */}
        <Button type="submit" onSubmit={onSubmit2} disabled={SubmitDisabled}>
          Apply {"  "}
          <FontAwesomeIcon icon={faWandMagicSparkles} />
        </Button>
        {/* <input type="submit" onSubmit={onSubmit2} disabled={SubmitDisabled} /> */}
        <p style={{ fontSize: "11px" }}>
          {SubmitDisabled ? "Upload image first!" : ""}
        </p>
      </Form>
    </div>
  );
};

export default InputSequence;
