import { faCoffee, faExpand, faRectangleList, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CodeEditor from "./CodeEditor";


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
  setShowDialog
}) => {
  
  const editorRef = useRef(null);
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
          normalize_range: true,
          scale_range: false,
        },
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if(!res.ok) {
          // alert("Not okay!")
          console.log(res)
          return (res.json()).then(res => { 
            setAlertText(res.error+"\n"+res.message)
            console.log(res)})
         }
         else{
        return res.formData()}})
      .then((res) => {
        const val = JSON.parse(res.get("field0"));
        setConf((val));
        const imageObjectURL = URL.createObjectURL(res.get("field1"));
        console.log(imageObjectURL);
        setImgURL(imageObjectURL);
      })
      .catch(error=>{
        // alert(error);
        console.log(error)
      })
  };
  return (
    <div className="block">
      <Button onClick={(e)=>setShowDialog(true)} variant="outline-dark" style={{float:"right",borderBottom: "0px",borderBottomRightRadius:"0px",borderBottomLeftRadius:"0px"}}>
        <FontAwesomeIcon icon={faExpand} />
      </Button>
      <Form onSubmit={onSubmit2}>
        <CodeEditor Code={Code} setCode={setCode} editorRef={editorRef} Trans={Trans}/>
        <br />
        <Button type="submit" onSubmit={onSubmit2} disabled={SubmitDisabled}>
          Apply!
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
