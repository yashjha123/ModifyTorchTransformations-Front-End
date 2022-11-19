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
  setAlertText
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
      <Form onSubmit={onSubmit2}>
        <CodeEditor editorRef={editorRef} Trans={Trans}/>
        <br />
        
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
